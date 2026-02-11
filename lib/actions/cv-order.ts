"use server";

import { minioClient, CV_LEADS_BUCKET, getPublicUrl, initializeBucket } from "@/lib/minio";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export interface UploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

export interface LeadData {
  name: string;
  email?: string;
  phone: string;
  service: string;
  servicePrice: string;
  template?: string;
  fileUrl?: string;
  fileName?: string;
  source?: string; // For tracking (e.g., "google-ads-cv-revamp")
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  hasExistingCV?: boolean;
  cvDetails?: {
    address?: string;
    summary?: string;
    skills?: string;
    education?: string;
    certifications?: string;
    experience?: string;
    volunteer?: string;
    languages?: string;
    additionalNotes?: string;
  };
}

export interface LeadResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

/**
 * Upload a file to MinIO and return the public URL
 */
export async function uploadCV(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG",
      };
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: "File too large. Maximum size is 10MB" };
    }

    // Ensure bucket exists before upload
    await initializeBucket();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const uniqueId = uuidv4();
    const timestamp = Date.now();
    const objectName = `leads/${timestamp}-${uniqueId}.${fileExt}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to MinIO
    await minioClient.putObject(
      CV_LEADS_BUCKET,
      objectName,
      buffer,
      buffer.length,
      {
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
      }
    );

    // Get public URL
    const publicUrl = getPublicUrl(CV_LEADS_BUCKET, objectName);

    return {
      success: true,
      url: publicUrl,
      fileName: file.name,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Save lead information to the database
 */
export async function saveLead(data: LeadData): Promise<LeadResult> {
  try {
    const { data: lead, error } = await supabase
      .from("cv_leads")
      .insert({
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        service: data.service,
        service_price: data.servicePrice,
        template: data.template || null,
        file_url: data.fileUrl || null,
        file_name: data.fileName || null,
        source: data.source || "cv-revamp-page",
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        has_existing_cv: data.hasExistingCV ?? null,
        cv_details: data.cvDetails ? JSON.stringify(data.cvDetails) : null,
        status: "new",
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Lead save error:", error);
      return { success: false, error: `Failed to save lead: ${error.message}` };
    }

    return {
      success: true,
      leadId: lead.id,
    };
  } catch (error) {
    console.error("Lead save error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save lead",
    };
  }
}

/**
 * Combined action: Upload CV and save lead in one call
 */
export async function submitCVOrder(
  formData: FormData,
  leadData: Omit<LeadData, "fileUrl" | "fileName">
): Promise<{
  success: boolean;
  leadId?: string;
  fileUrl?: string;
  error?: string;
}> {
  try {
    // Upload file if present
    let fileUrl: string | undefined;
    let fileName: string | undefined;

    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      const uploadResult = await uploadCV(formData);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }
      fileUrl = uploadResult.url;
      fileName = uploadResult.fileName;
    }

    // Save lead with file info
    const leadResult = await saveLead({
      ...leadData,
      fileUrl,
      fileName,
    });

    if (!leadResult.success) {
      return { success: false, error: leadResult.error };
    }

    return {
      success: true,
      leadId: leadResult.leadId,
      fileUrl,
    };
  } catch (error) {
    console.error("Submit order error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Submission failed",
    };
  }
}
