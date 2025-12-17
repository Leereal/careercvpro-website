/**
 * CareerCVPro Job Importer - Admin JavaScript
 */
(function ($) {
  "use strict";

  const JobImporter = {
    imageData: null,
    featuredImageData: null,

    init: function () {
      this.bindEvents();
      this.initTabs();
      this.initImageUpload();
      this.initFeaturedImageUpload();
    },

    bindEvents: function () {
      // Extract button
      $("#ccvp-extract-btn").on("click", this.handleExtract.bind(this));

      // Back button
      $("#ccvp-back-btn").on("click", this.showInputSection.bind(this));

      // Job form submission
      $("#ccvp-job-form").on("submit", this.handleCreateJob.bind(this));

      // Add another button
      $("#ccvp-add-another").on("click", this.resetForm.bind(this));
    },

    initTabs: function () {
      $(".ccvp-tab-btn").on("click", function () {
        const tab = $(this).data("tab");

        // Update active tab button
        $(".ccvp-tab-btn").removeClass("active");
        $(this).addClass("active");

        // Show corresponding content
        $(".ccvp-tab-content").removeClass("active");
        $("#tab-" + tab).addClass("active");
      });
    },

    initImageUpload: function () {
      const self = this;
      const $dropzone = $("#ccvp-image-dropzone");
      const $input = $("#ccvp-image-input");
      const $preview = $(".ccvp-image-preview");
      const $previewImg = $("#ccvp-preview-img");
      const $dropzoneContent = $(".ccvp-dropzone-content");

      // Browse link click
      $("#ccvp-browse-link").on("click", function (e) {
        e.preventDefault();
        $input.trigger("click");
      });

      // File input change
      $input.on("change", function () {
        if (this.files && this.files[0]) {
          self.handleImageFile(this.files[0]);
        }
      });

      // Drag and drop
      $dropzone.on("dragover dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass("dragover");
      });

      $dropzone.on("dragleave dragend drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass("dragover");
      });

      $dropzone.on("drop", function (e) {
        const files = e.originalEvent.dataTransfer.files;
        if (files && files[0]) {
          self.handleImageFile(files[0]);
        }
      });

      // Remove image
      $(".ccvp-remove-image").on("click", function () {
        self.imageData = null;
        $input.val("");
        $previewImg.attr("src", "");
        $preview.hide();
        $dropzoneContent.show();
      });
    },

    initFeaturedImageUpload: function () {
      const self = this;
      const $dropzone = $("#ccvp-featured-image-dropzone");
      const $input = $("#ccvp-featured-image-input");
      const $preview = $(".ccvp-featured-image-preview");
      const $previewImg = $("#ccvp-featured-preview-img");
      const $dropzoneContent = $(".ccvp-featured-dropzone-content");

      // Browse link click
      $("#ccvp-featured-browse-link").on("click", function (e) {
        e.preventDefault();
        $input.trigger("click");
      });

      // File input change
      $input.on("change", function () {
        if (this.files && this.files[0]) {
          self.handleFeaturedImageFile(this.files[0]);
        }
      });

      // Drag and drop
      $dropzone.on("dragover dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass("dragover");
      });

      $dropzone.on("dragleave dragend drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass("dragover");
      });

      $dropzone.on("drop", function (e) {
        const files = e.originalEvent.dataTransfer.files;
        if (files && files[0]) {
          self.handleFeaturedImageFile(files[0]);
        }
      });

      // Remove image
      $(".ccvp-remove-featured-image").on("click", function () {
        self.featuredImageData = null;
        $input.val("");
        $previewImg.attr("src", "");
        $("#job-featured-image-data").val("");
        $preview.hide();
        $dropzoneContent.show();
      });
    },

    handleFeaturedImageFile: function (file) {
      const self = this;

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        self.featuredImageData = e.target.result;
        $("#ccvp-featured-preview-img").attr("src", e.target.result);
        $("#job-featured-image-data").val(e.target.result);
        $(".ccvp-featured-image-preview").show();
        $(".ccvp-featured-dropzone-content").hide();
      };
      reader.readAsDataURL(file);
    },

    handleImageFile: function (file) {
      const self = this;

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        self.imageData = e.target.result;
        $("#ccvp-preview-img").attr("src", e.target.result);
        $(".ccvp-image-preview").show();
        $(".ccvp-dropzone-content").hide();
      };
      reader.readAsDataURL(file);
    },

    handleExtract: function () {
      const self = this;
      const rawText = $("#ccvp-raw-text").val().trim();

      if (!rawText && !this.imageData) {
        alert("Please enter job posting text or upload an image.");
        return;
      }

      // Show loading
      $("#ccvp-extract-btn").hide();
      $("#ccvp-loading").show();

      $.ajax({
        url: ccvpJobImporter.ajaxUrl,
        type: "POST",
        data: {
          action: "ccvp_extract_job_data",
          nonce: ccvpJobImporter.nonce,
          raw_text: rawText,
          image_data: this.imageData || "",
        },
        success: function (response) {
          $("#ccvp-loading").hide();
          $("#ccvp-extract-btn").show();

          if (response.success) {
            self.populateForm(response.data);
            self.showPreviewSection();
          } else {
            alert(
              "Error: " +
                (response.data.message || "Failed to extract job data")
            );
          }
        },
        error: function (xhr, status, error) {
          $("#ccvp-loading").hide();
          $("#ccvp-extract-btn").show();
          alert("Request failed: " + error);
        },
      });
    },

    populateForm: function (data) {
      // Basic info
      $("#job-title").val(data.title || "");
      $("#job-company").val(data.company_name || "");
      $("#job-location").val(data.location || "");
      $("#job-province").val(data.province || "");
      $("#job-salary").val(data.salary_range || "Market Related");

      // Contact info
      $("#job-email").val(data.application_email || "");
      $("#job-phone").val(data.contact_phone || "");
      $("#job-website").val(data.company_website || "");
      $("#job-apply-url").val(data.external_apply_url || "");
      $("#job-deadline").val(data.application_deadline || "");

      // Categories
      $("#job-type").val(data.job_type || "Full-time");

      // Handle job categories array
      if (Array.isArray(data.job_categories)) {
        $("#job-categories").val(data.job_categories.join(", "));
      } else if (typeof data.job_categories === "string") {
        $("#job-categories").val(data.job_categories);
      }

      // Checkboxes
      $("#job-featured").prop("checked", data.is_featured === true);
      $("#job-urgent").prop("checked", data.is_urgent === true);

      // Logo URL
      $("#job-logo-url").val(data.company_logo_url || "");

      // Description
      $("#job-excerpt").val(data.excerpt || "");
      $("#job-description").val(data.description || "");
    },

    showPreviewSection: function () {
      $(".ccvp-input-section").hide();
      $(".ccvp-preview-section").show();
      $(".ccvp-success-section").hide();

      // Scroll to top
      $("html, body").animate({ scrollTop: 0 }, 300);
    },

    showInputSection: function () {
      $(".ccvp-input-section").show();
      $(".ccvp-preview-section").hide();
      $(".ccvp-success-section").hide();
    },

    showSuccessSection: function (data) {
      $(".ccvp-input-section").hide();
      $(".ccvp-preview-section").hide();
      $(".ccvp-success-section").show();

      $("#ccvp-success-message").text(
        data.message || "Job created successfully!"
      );
      $("#ccvp-view-job").attr("href", data.view_url || "#");
      $("#ccvp-edit-job").attr("href", data.edit_url || "#");

      // Scroll to top
      $("html, body").animate({ scrollTop: 0 }, 300);
    },

    handleCreateJob: function (e) {
      e.preventDefault();

      const self = this;

      // Gather form data
      const jobData = {
        title: $("#job-title").val(),
        company_name: $("#job-company").val(),
        location: $("#job-location").val(),
        province: $("#job-province").val(),
        salary_range: $("#job-salary").val(),
        application_email: $("#job-email").val(),
        contact_phone: $("#job-phone").val(),
        company_website: $("#job-website").val(),
        external_apply_url: $("#job-apply-url").val(),
        application_deadline: $("#job-deadline").val(),
        job_type: $("#job-type").val(),
        job_categories: $("#job-categories")
          .val()
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        is_featured: $("#job-featured").is(":checked"),
        is_urgent: $("#job-urgent").is(":checked"),
        excerpt: $("#job-excerpt").val(),
        description: $("#job-description").val(),
        company_logo_url: $("#job-logo-url").val(),
        featured_image_data: $("#job-featured-image-data").val(),
      };

      // Validate required fields
      if (!jobData.title) {
        alert("Job title is required.");
        $("#job-title").focus();
        return;
      }

      // Show loading
      $("#ccvp-create-btn").hide();
      $("#ccvp-creating").show();

      $.ajax({
        url: ccvpJobImporter.ajaxUrl,
        type: "POST",
        data: {
          action: "ccvp_create_job",
          nonce: ccvpJobImporter.nonce,
          job_data: jobData,
        },
        success: function (response) {
          $("#ccvp-creating").hide();
          $("#ccvp-create-btn").show();

          if (response.success) {
            self.showSuccessSection(response.data);
          } else {
            alert(
              "Error: " + (response.data.message || "Failed to create job")
            );
          }
        },
        error: function (xhr, status, error) {
          $("#ccvp-creating").hide();
          $("#ccvp-create-btn").show();
          alert("Request failed: " + error);
        },
      });
    },

    resetForm: function () {
      // Clear text input
      $("#ccvp-raw-text").val("");

      // Clear image
      this.imageData = null;
      $("#ccvp-image-input").val("");
      $("#ccvp-preview-img").attr("src", "");
      $(".ccvp-image-preview").hide();
      $(".ccvp-dropzone-content").show();

      // Clear featured image
      this.featuredImageData = null;
      $("#ccvp-featured-image-input").val("");
      $("#ccvp-featured-preview-img").attr("src", "");
      $("#job-featured-image-data").val("");
      $(".ccvp-featured-image-preview").hide();
      $(".ccvp-featured-dropzone-content").show();

      // Clear form
      $("#ccvp-job-form")[0].reset();

      // Reset to text tab
      $(".ccvp-tab-btn").removeClass("active");
      $('.ccvp-tab-btn[data-tab="text"]').addClass("active");
      $(".ccvp-tab-content").removeClass("active");
      $("#tab-text").addClass("active");

      // Show input section
      this.showInputSection();
    },
  };

  // Initialize on document ready
  $(document).ready(function () {
    JobImporter.init();
  });
})(jQuery);
