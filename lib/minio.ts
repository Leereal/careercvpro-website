import * as Minio from "minio";

// MinIO configuration from environment variables
const minioConfig = {
  endPoint: process.env.MINIO_ENDPOINT || "storage.cvevolve.com",
  port: parseInt(process.env.MINIO_PORT || "443"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
};

// Create MinIO client instance
export const minioClient = new Minio.Client(minioConfig);

// Bucket for CV leads uploads
export const CV_LEADS_BUCKET = process.env.MINIO_CV_LEADS_BUCKET || "cv-leads";

// Base URL for public access
export const MINIO_BASE_URL =
  process.env.MINIO_BASE_URL || "https://storage.cvevolve.com";

/**
 * Generate a public URL for an uploaded object
 */
export function getPublicUrl(bucket: string, objectName: string): string {
  return `${MINIO_BASE_URL}/${bucket}/${objectName}`;
}

/**
 * Initialize the CV leads bucket if it doesn't exist
 */
export async function initializeBucket(): Promise<void> {
  try {
    const exists = await minioClient.bucketExists(CV_LEADS_BUCKET);
    if (!exists) {
      await minioClient.makeBucket(CV_LEADS_BUCKET);
      console.log(`Bucket ${CV_LEADS_BUCKET} created successfully`);

      // Set bucket policy to allow public read access
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${CV_LEADS_BUCKET}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(
        CV_LEADS_BUCKET,
        JSON.stringify(policy)
      );
    }
  } catch (error) {
    console.error("Error initializing MinIO bucket:", error);
  }
}
