/**
 * CareerCVPro Post Importer - Admin JavaScript
 */
(function ($) {
  "use strict";

  // State management
  const state = {
    currentStep: "input",
    rawContent: "",
    processedContent: "",
    isProcessing: false,
    isHtmlMode: false,
    savedRange: null,
  };

  // Initialize
  $(document).ready(function () {
    initStepNavigation();
    initProcessingOptions();
    initRichTextEditor();
    initImageHandling();
    initLinkHandling();
    initFeaturedImage();
    initArticleForm();
    initManagePage();
  });

  // =========================================
  // Step Navigation
  // =========================================

  function initStepNavigation() {
    // Process with AI button
    $("#ccvp-process-btn").on("click", function () {
      processContent();
    });

    // Skip to editor button
    $("#ccvp-skip-processing-btn").on("click", function () {
      const content = $("#ccvp-raw-content").val();
      if (!content.trim()) {
        alert("Please enter some content first.");
        return;
      }
      state.processedContent = content;
      setEditorContent(content);
      showStep("edit");
    });

    // Back to input
    $("#ccvp-back-to-input").on("click", function () {
      showStep("input");
    });

    // Continue to meta
    $("#ccvp-continue-to-meta").on("click", function () {
      state.processedContent = getEditorContent();
      autoFillMetaFields();
      showStep("meta");
    });

    // Back to edit
    $("#ccvp-back-to-edit").on("click", function () {
      showStep("edit");
    });

    // Create another
    $("#ccvp-create-another").on("click", function () {
      resetForm();
      showStep("input");
    });
  }

  function showStep(step) {
    state.currentStep = step;

    // Hide all steps
    $(".ccvp-step").hide();

    // Show current step
    $(`#step-${step}`).show();

    // Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 300);
  }

  // =========================================
  // Content Processing
  // =========================================

  function initProcessingOptions() {
    // Update word count display when mode changes
    $("#ccvp-processing-mode").on("change", function () {
      const mode = $(this).val();
      if (mode === "summarize") {
        $("#ccvp-word-count").val("500");
      } else if (mode === "expand") {
        $("#ccvp-word-count").val("1800");
      }
    });
  }

  function processContent() {
    const content = $("#ccvp-raw-content").val();

    if (!content.trim()) {
      alert("Please enter some content to process.");
      return;
    }

    const mode = $("#ccvp-processing-mode").val();
    const wordCount = $("#ccvp-word-count").val();
    const tone = $("#ccvp-tone").val();
    const audience = $("#ccvp-audience").val();

    state.isProcessing = true;
    $("#ccvp-process-btn, #ccvp-skip-processing-btn").prop("disabled", true);
    $("#ccvp-processing-status").show();

    // Animate progress bar
    animateProgressBar();

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: {
        action: "ccvp_process_content",
        nonce: ccvpPostImporter.nonce,
        content: content,
        mode: mode,
        word_count: wordCount,
        tone: tone,
        audience: audience,
      },
      success: function (response) {
        state.isProcessing = false;
        $("#ccvp-process-btn, #ccvp-skip-processing-btn").prop(
          "disabled",
          false
        );
        $("#ccvp-processing-status").hide();

        if (response.success) {
          state.processedContent = response.data.content;
          setEditorContent(response.data.content);
          showStep("edit");
        } else {
          alert("Error: " + (response.data.message || "Processing failed"));
        }
      },
      error: function (xhr, status, error) {
        state.isProcessing = false;
        $("#ccvp-process-btn, #ccvp-skip-processing-btn").prop(
          "disabled",
          false
        );
        $("#ccvp-processing-status").hide();
        alert("Error processing content. Please try again.");
        console.error("AJAX error:", error);
      },
    });
  }

  function animateProgressBar() {
    let progress = 0;
    const $fill = $(".ccvp-progress-fill");

    const interval = setInterval(function () {
      if (!state.isProcessing) {
        clearInterval(interval);
        $fill.css("width", "100%");
        return;
      }

      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      $fill.css("width", progress + "%");
    }, 500);
  }

  // =========================================
  // Rich Text Editor
  // =========================================

  function initRichTextEditor() {
    const $editor = $("#ccvp-editor");
    const $htmlEditor = $("#ccvp-editor-html");

    // Toolbar commands
    $(".ccvp-toolbar-btn[data-command]").on("click", function () {
      const command = $(this).data("command");
      document.execCommand(command, false, null);
      $editor.focus();
      updateStats();
    });

    // Format block (headings, paragraphs)
    $('select[data-command="formatBlock"]').on("change", function () {
      const value = $(this).val();
      document.execCommand("formatBlock", false, "<" + value + ">");
      $editor.focus();
    });

    // Font size
    $('select[data-command="fontSize"]').on("change", function () {
      const value = $(this).val();
      document.execCommand("fontSize", false, value);
      $editor.focus();
    });

    // Text color
    $("#ccvp-text-color").on("change", function () {
      document.execCommand("foreColor", false, $(this).val());
      $editor.focus();
    });

    // Background color
    $("#ccvp-bg-color").on("change", function () {
      document.execCommand("hiliteColor", false, $(this).val());
      $editor.focus();
    });

    // Toggle HTML view
    $(".ccvp-toggle-html-btn").on("click", function () {
      toggleHtmlMode();
    });

    // Fullscreen
    $(".ccvp-fullscreen-btn").on("click", function () {
      $(".ccvp-card").first().toggleClass("ccvp-fullscreen");
      $(this)
        .find(".dashicons")
        .toggleClass("dashicons-fullscreen-alt dashicons-fullscreen-exit-alt");
    });

    // Update stats on input
    $editor.on("input keyup", function () {
      updateStats();
    });

    // Sync HTML editor
    $htmlEditor.on("input", function () {
      if (state.isHtmlMode) {
        $editor.html($(this).val());
        updateStats();
      }
    });

    // Keyboard shortcuts
    $editor.on("keydown", function (e) {
      // Ctrl+B for bold
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        document.execCommand("bold", false, null);
      }
      // Ctrl+I for italic
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        document.execCommand("italic", false, null);
      }
      // Ctrl+U for underline
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        document.execCommand("underline", false, null);
      }
    });
  }

  function toggleHtmlMode() {
    const $editor = $("#ccvp-editor");
    const $htmlEditor = $("#ccvp-editor-html");

    state.isHtmlMode = !state.isHtmlMode;

    if (state.isHtmlMode) {
      $htmlEditor.val($editor.html());
      $editor.hide();
      $htmlEditor.show();
    } else {
      $editor.html($htmlEditor.val());
      $htmlEditor.hide();
      $editor.show();
    }
  }

  function setEditorContent(content) {
    $("#ccvp-editor").html(content);
    $("#ccvp-editor-html").val(content);
    updateStats();
  }

  function getEditorContent() {
    if (state.isHtmlMode) {
      return $("#ccvp-editor-html").val();
    }
    return $("#ccvp-editor").html();
  }

  function updateStats() {
    const content = getEditorContent();
    const text = $("<div>").html(content).text();
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    const chars = text.length;
    const readTime = Math.ceil(words / 200);

    $("#ccvp-word-count-display").text(words + " words");
    $("#ccvp-char-count-display").text(chars + " characters");
    $("#ccvp-read-time-display").text("~" + readTime + " min read");
  }

  // =========================================
  // Image Handling
  // =========================================

  function initImageHandling() {
    const $modal = $("#ccvp-image-modal");

    // Open image modal
    $(".ccvp-insert-image-btn").on("click", function () {
      saveSelection();
      $modal.show();
    });

    // Image tabs
    $(".ccvp-image-tab").on("click", function () {
      const tab = $(this).data("tab");
      $(".ccvp-image-tab").removeClass("active");
      $(this).addClass("active");
      $(".ccvp-image-tab-content").removeClass("active");
      $(`#image-tab-${tab}`).addClass("active");
    });

    // Browse for inline image
    $("#ccvp-browse-inline").on("click", function (e) {
      e.preventDefault();
      $("#ccvp-inline-image-input").click();
    });

    // Inline image dropzone click
    $("#ccvp-inline-image-dropzone").on("click", function () {
      $("#ccvp-inline-image-input").click();
    });

    // Drag and drop
    $("#ccvp-inline-image-dropzone")
      .on("dragover", function (e) {
        e.preventDefault();
        $(this).addClass("dragover");
      })
      .on("dragleave drop", function (e) {
        e.preventDefault();
        $(this).removeClass("dragover");

        if (e.type === "drop") {
          const files = e.originalEvent.dataTransfer.files;
          if (files.length && files[0].type.startsWith("image/")) {
            uploadInlineImage(files[0]);
          }
        }
      });

    // File input change
    $("#ccvp-inline-image-input").on("change", function () {
      if (this.files.length) {
        uploadInlineImage(this.files[0]);
      }
    });

    // Open media library
    $("#ccvp-open-media-library").on("click", function () {
      openMediaLibrary(function (url, alt) {
        $("#ccvp-image-url").val(url);
        $("#ccvp-image-alt").val(alt || "");
      });
    });

    // Insert image
    $("#ccvp-insert-image").on("click", function () {
      insertImage();
    });

    // Close modal
    $(".ccvp-modal-close, .ccvp-modal-cancel").on("click", function () {
      $(this).closest(".ccvp-modal").hide();
    });

    // Close on backdrop click
    $(".ccvp-modal").on("click", function (e) {
      if (e.target === this) {
        $(this).hide();
      }
    });
  }

  function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      state.savedRange = sel.getRangeAt(0);
    }
  }

  function restoreSelection() {
    if (state.savedRange) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(state.savedRange);
    }
  }

  function uploadInlineImage(file) {
    const formData = new FormData();
    formData.append("action", "ccvp_upload_inline_image");
    formData.append("nonce", ccvpPostImporter.nonce);
    formData.append("image", file);
    formData.append("alt", $("#ccvp-image-alt").val());

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          $("#ccvp-image-url").val(response.data.url);
          $("#ccvp-inline-image-dropzone .ccvp-image-dropzone").html(
            '<p style="color: green;">✓ Image uploaded: ' + file.name + "</p>"
          );
        } else {
          alert("Upload failed: " + (response.data.message || "Unknown error"));
        }
      },
      error: function () {
        alert("Failed to upload image. Please try again.");
      },
    });
  }

  function insertImage() {
    const url = $("#ccvp-image-url").val();

    if (!url) {
      alert("Please provide an image URL or upload an image.");
      return;
    }

    const alt = $("#ccvp-image-alt").val() || "";
    const align = $("#ccvp-image-align").val();
    const width = $("#ccvp-image-width").val();

    let classes = [];
    if (align && align !== "none") {
      classes.push("align-" + align);
    }

    let style = "";
    if (width) {
      style = ` style="width: ${width};"`;
    }

    const html = `<img src="${url}" alt="${alt}" class="${classes.join(
      " "
    )}"${style}>`;

    // Insert at cursor position
    $("#ccvp-image-modal").hide();
    restoreSelection();

    const $editor = $("#ccvp-editor");
    $editor.focus();
    document.execCommand("insertHTML", false, html);

    // Clear form
    $("#ccvp-image-url, #ccvp-image-alt, #ccvp-image-width").val("");
    $("#ccvp-image-align").val("none");

    updateStats();
  }

  function openMediaLibrary(callback) {
    const frame = wp.media({
      title: "Select Image",
      button: { text: "Use this image" },
      multiple: false,
      library: { type: "image" },
    });

    frame.on("select", function () {
      const attachment = frame.state().get("selection").first().toJSON();
      callback(attachment.url, attachment.alt);
    });

    frame.open();
  }

  // =========================================
  // Link Handling
  // =========================================

  function initLinkHandling() {
    const $modal = $("#ccvp-link-modal");

    // Open link modal
    $(".ccvp-insert-link-btn").on("click", function () {
      saveSelection();

      // Get selected text
      const selection = window.getSelection();
      const selectedText = selection.toString();
      $("#ccvp-link-text").val(selectedText);

      $modal.show();
    });

    // Insert link
    $("#ccvp-insert-link").on("click", function () {
      insertLink();
    });
  }

  function insertLink() {
    const url = $("#ccvp-link-url").val();

    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    const text = $("#ccvp-link-text").val() || url;
    const newTab = $("#ccvp-link-new-tab").is(":checked");
    const nofollow = $("#ccvp-link-nofollow").is(":checked");

    let attrs = [`href="${url}"`];
    if (newTab) attrs.push('target="_blank"');
    if (nofollow) attrs.push('rel="nofollow"');

    const html = `<a ${attrs.join(" ")}>${text}</a>`;

    $("#ccvp-link-modal").hide();
    restoreSelection();

    const $editor = $("#ccvp-editor");
    $editor.focus();
    document.execCommand("insertHTML", false, html);

    // Clear form
    $("#ccvp-link-url, #ccvp-link-text").val("");

    updateStats();
  }

  // =========================================
  // Featured Image
  // =========================================

  function initFeaturedImage() {
    const $zone = $("#ccvp-featured-image-zone");
    const $input = $("#ccvp-featured-image-input");
    const $preview = $(".ccvp-featured-image-preview");
    const $content = $(".ccvp-featured-dropzone-content");

    // Browse click
    $("#ccvp-browse-featured").on("click", function (e) {
      e.preventDefault();
      openMediaLibrary(function (url) {
        showFeaturedPreview(url);
        $("#article-featured-image-url").val(url);
      });
    });

    // Dropzone click
    $zone.on("click", function (e) {
      if (!$(e.target).is("button, button *")) {
        openMediaLibrary(function (url, alt, id) {
          showFeaturedPreview(url);
          $("#article-featured-image-url").val(url);
          if (id) $("#article-featured-image-id").val(id);
        });
      }
    });

    // Drag and drop
    $zone
      .on("dragover", function (e) {
        e.preventDefault();
        $(this).addClass("dragover");
      })
      .on("dragleave drop", function (e) {
        e.preventDefault();
        $(this).removeClass("dragover");

        if (e.type === "drop") {
          const files = e.originalEvent.dataTransfer.files;
          if (files.length && files[0].type.startsWith("image/")) {
            uploadFeaturedImage(files[0]);
          }
        }
      });

    // URL input
    $("#article-featured-url").on("blur", function () {
      const url = $(this).val();
      if (url) {
        showFeaturedPreview(url);
        $("#article-featured-image-url").val(url);
      }
    });

    // Remove featured image
    $(".ccvp-remove-featured").on("click", function (e) {
      e.stopPropagation();
      $preview.hide();
      $content.show();
      $(
        "#article-featured-image-id, #article-featured-image-url, #article-featured-url"
      ).val("");
    });
  }

  function showFeaturedPreview(url) {
    $("#ccvp-featured-preview").attr("src", url);
    $(".ccvp-featured-image-preview").show();
    $(".ccvp-featured-dropzone-content").hide();
  }

  function uploadFeaturedImage(file) {
    const formData = new FormData();
    formData.append("action", "ccvp_upload_inline_image");
    formData.append("nonce", ccvpPostImporter.nonce);
    formData.append("image", file);

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          showFeaturedPreview(response.data.url);
          $("#article-featured-image-id").val(response.data.id);
          $("#article-featured-image-url").val(response.data.url);
        } else {
          alert("Upload failed: " + (response.data.message || "Unknown error"));
        }
      },
      error: function () {
        alert("Failed to upload image. Please try again.");
      },
    });
  }

  // =========================================
  // Article Form
  // =========================================

  function initArticleForm() {
    // SEO character counters
    $("#article-seo-title").on("input", function () {
      const len = $(this).val().length;
      const $counter = $("#seo-title-counter");
      $counter.text(len + "/60");
      $counter.toggleClass("warning", len > 50 && len <= 60);
      $counter.toggleClass("error", len > 60);
    });

    $("#article-seo-description").on("input", function () {
      const len = $(this).val().length;
      const $counter = $("#seo-desc-counter");
      $counter.text(len + "/160");
      $counter.toggleClass("warning", len > 140 && len <= 160);
      $counter.toggleClass("error", len > 160);
    });

    // Auto-generate slug
    $("#article-title").on("blur", function () {
      const $slug = $("#article-slug");
      if (!$slug.val()) {
        const slug = $(this)
          .val()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        $slug.val(slug);
      }
    });

    // Save as draft
    $("#ccvp-save-draft").on("click", function () {
      $("#article-status").val("draft");
      submitArticle();
    });

    // Form submit
    $("#ccvp-article-form").on("submit", function (e) {
      e.preventDefault();
      submitArticle();
    });
  }

  function autoFillMetaFields() {
    const content = state.processedContent;
    const text = $("<div>").html(content).text();

    // Auto-extract title from first heading
    const $content = $("<div>").html(content);
    const $firstHeading = $content.find("h1, h2, h3").first();
    if ($firstHeading.length && !$("#article-title").val()) {
      $("#article-title").val($firstHeading.text().trim());
    }

    // Auto-generate excerpt
    if (!$("#article-excerpt").val()) {
      const sentences = text
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 20);
      if (sentences.length) {
        $("#article-excerpt").val(sentences[0].trim().substring(0, 200));
      }
    }

    // Auto-calculate read time
    const words = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    $("#article-read-time").val(readTime + " min read");
  }

  function submitArticle() {
    const $btn = $("#ccvp-publish-btn");
    const originalText = $btn.html();

    // Validate
    if (!$("#article-title").val()) {
      alert("Please enter an article title.");
      return;
    }

    if (!$("#article-category").val()) {
      alert("Please select a category.");
      return;
    }

    $btn
      .prop("disabled", true)
      .html(
        '<span class="spinner is-active" style="float:none;margin:0 5px 0 0;"></span> Creating...'
      );

    const articleData = {
      title: $("#article-title").val(),
      slug: $("#article-slug").val(),
      content: state.processedContent,
      excerpt: $("#article-excerpt").val(),
      category: $("#article-category").val(),
      tags: $("#article-tags").val(),
      seo_title: $("#article-seo-title").val(),
      seo_description: $("#article-seo-description").val(),
      status: $("#article-status").val(),
      read_time: $("#article-read-time").val(),
      is_featured: $("#article-featured").is(":checked"),
      featured_image_id: $("#article-featured-image-id").val(),
      featured_image_url:
        $("#article-featured-image-url").val() ||
        $("#article-featured-url").val(),
    };

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: {
        action: "ccvp_create_article",
        nonce: ccvpPostImporter.nonce,
        article_data: articleData,
      },
      success: function (response) {
        $btn.prop("disabled", false).html(originalText);

        if (response.success) {
          // Update success links
          $("#ccvp-view-article").attr("href", response.data.view_url);
          $("#ccvp-edit-article").attr("href", response.data.edit_url);

          showStep("success");
        } else {
          alert(
            "Error: " + (response.data.message || "Failed to create article")
          );
        }
      },
      error: function () {
        $btn.prop("disabled", false).html(originalText);
        alert("Failed to create article. Please try again.");
      },
    });
  }

  function resetForm() {
    state.rawContent = "";
    state.processedContent = "";

    $("#ccvp-raw-content").val("");
    $("#ccvp-editor").html("");
    $("#ccvp-editor-html").val("");
    $("#ccvp-article-form")[0].reset();

    $(".ccvp-featured-image-preview").hide();
    $(".ccvp-featured-dropzone-content").show();

    updateStats();
  }

  // =========================================
  // Manage Page
  // =========================================

  function initManagePage() {
    if (!$("#ccvp-articles-table").length) return;

    loadArticles();

    // Filter change
    $("#ccvp-filter-category, #ccvp-filter-status").on("change", function () {
      loadArticles();
    });

    // Search
    $("#ccvp-search-btn").on("click", function () {
      loadArticles();
    });

    $("#ccvp-search-articles").on("keypress", function (e) {
      if (e.which === 13) {
        loadArticles();
      }
    });
  }

  function loadArticles(page = 1) {
    const $tbody = $("#ccvp-articles-body");

    $tbody.html(
      '<tr class="ccvp-loading-row"><td colspan="5"><span class="spinner is-active"></span> Loading articles...</td></tr>'
    );

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: {
        action: "ccvp_get_articles",
        nonce: ccvpPostImporter.nonce,
        category: $("#ccvp-filter-category").val(),
        status: $("#ccvp-filter-status").val(),
        search: $("#ccvp-search-articles").val(),
        page: page,
      },
      success: function (response) {
        if (response.success) {
          renderArticles(response.data.articles);
          renderPagination(response.data.pages, response.data.page);
        } else {
          $tbody.html('<tr><td colspan="5">Error loading articles.</td></tr>');
        }
      },
      error: function () {
        $tbody.html('<tr><td colspan="5">Failed to load articles.</td></tr>');
      },
    });
  }

  function renderArticles(articles) {
    const $tbody = $("#ccvp-articles-body");

    if (!articles.length) {
      $tbody.html(
        '<tr><td colspan="5" style="text-align:center;padding:40px;">No articles found.</td></tr>'
      );
      return;
    }

    const categoryLabels = {
      "cv-guides": "CV Guides",
      "interview-guides": "Interview Guides",
      "job-search-guides": "Job Search Guides",
      "workplace-guides": "Workplace Guides",
    };

    let html = "";
    articles.forEach(function (article) {
      html += `
                <tr>
                    <td class="column-image">
                        ${
                          article.featured_image
                            ? `<img src="${article.featured_image}" alt="">`
                            : '<span class="dashicons dashicons-format-image" style="font-size:30px;color:#ccc;"></span>'
                        }
                    </td>
                    <td class="column-title">
                        <a href="${article.edit_url}" target="_blank">${
        article.title
      }</a>
                        ${
                          article.is_featured
                            ? '<span class="dashicons dashicons-star-filled" style="color:#dba617;" title="Featured"></span>'
                            : ""
                        }
                    </td>
                    <td class="column-category">${
                      categoryLabels[article.category] || article.category
                    }</td>
                    <td class="column-status">
                        <span class="ccvp-status-badge ${article.status}">${
        article.status
      }</span>
                    </td>
                    <td class="column-actions">
                        <div class="ccvp-article-actions">
                            <a href="${
                              article.view_url
                            }" class="button button-small" target="_blank" title="View">
                                <span class="dashicons dashicons-visibility"></span>
                            </a>
                            <a href="${
                              article.edit_url
                            }" class="button button-small" target="_blank" title="Edit">
                                <span class="dashicons dashicons-edit"></span>
                            </a>
                            <button type="button" class="button button-small ccvp-delete-article" data-id="${
                              article.id
                            }" title="Delete">
                                <span class="dashicons dashicons-trash"></span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
    });

    $tbody.html(html);

    // Delete button
    $(".ccvp-delete-article").on("click", function () {
      const postId = $(this).data("id");
      if (
        confirm(
          "Are you sure you want to delete this article? This cannot be undone."
        )
      ) {
        deleteArticle(postId, $(this));
      }
    });
  }

  function renderPagination(totalPages, currentPage) {
    const $pagination = $("#ccvp-pagination");

    if (totalPages <= 1) {
      $pagination.hide();
      return;
    }

    let html = "";
    for (let i = 1; i <= totalPages; i++) {
      html += `<button type="button" class="ccvp-page-btn ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">${i}</button>`;
    }

    $pagination.html(html).show();

    $(".ccvp-page-btn").on("click", function () {
      loadArticles($(this).data("page"));
    });
  }

  function deleteArticle(postId, $btn) {
    const originalHtml = $btn.html();
    $btn
      .prop("disabled", true)
      .html(
        '<span class="spinner is-active" style="float:none;margin:0;"></span>'
      );

    $.ajax({
      url: ccvpPostImporter.ajaxUrl,
      type: "POST",
      data: {
        action: "ccvp_delete_article",
        nonce: ccvpPostImporter.nonce,
        post_id: postId,
      },
      success: function (response) {
        if (response.success) {
          loadArticles();
        } else {
          $btn.prop("disabled", false).html(originalHtml);
          alert("Delete failed: " + (response.data.message || "Unknown error"));
        }
      },
      error: function () {
        $btn.prop("disabled", false).html(originalHtml);
        alert("Failed to delete. Please try again.");
      },
    });
  }
})(jQuery);
