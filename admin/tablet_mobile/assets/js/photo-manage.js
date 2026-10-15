(function () {
  "use strict";

  var MAX_FILE_SIZE = 10 * 1024 * 1024;
  var gallery = document.getElementById("photoGallery");
  var uploadList = document.getElementById("photoUploadList");
  var uploadAllButton = document.getElementById("uploadAllPhotos");
  var sourceInputs = document.querySelectorAll(".js-photo-source");

  if (!gallery || !uploadList || !uploadAllButton || !sourceInputs.length) return;

  var emptyState = gallery.querySelector(".empty-state");
  var queuedPhotos = [];
  var previewUrls = [];
  var queueSequence = 0;
  var photoSequence = 0;
  var imagePattern = /\.(avif|bmp|gif|heic|heif|jpe?g|png|webp)$/i;

  function isImageFile(file) {
    return Boolean(file && ((file.type && file.type.indexOf("image/") === 0) || imagePattern.test(file.name)));
  }

  function formatFileSize(size) {
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  }

  function assignFile(input, file) {
    try {
      var transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      return input.files.length === 1;
    } catch (error) {
      input.photoFile = file;
      return false;
    }
  }

  function createStoredFileInput(file, photoId) {
    var input = document.createElement("input");
    input.type = "file";
    input.name = "photos[]";
    input.accept = "image/*";
    input.className = "photo-gallery__file";
    input.id = "photoFile" + photoId;
    input.hidden = true;
    input.setAttribute("aria-label", file.name + " 첨부 파일");
    input.dataset.fileName = file.name;
    input.dataset.fileAttached = assignFile(input, file) ? "true" : "fallback";
    return input;
  }

  function createActionIcon(src, className) {
    var icon = document.createElement("img");
    icon.className = className;
    icon.src = src;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  function createDownloadAction(file, previewUrl) {
    var link = document.createElement("a");
    link.className = "photo-gallery__action photo-gallery__action--download";
    link.href = previewUrl;
    link.download = file.name;
    link.setAttribute("aria-label", file.name + " 다운로드");
    link.appendChild(createActionIcon("../../assets/images/figma/photo_action_bg.svg", "photo-gallery__action-bg"));
    link.appendChild(
      createActionIcon("../../assets/images/figma/photo_action_download.svg", "photo-gallery__action-icon"),
    );
    return link;
  }

  function updateEmptyState() {
    var hasPhotos = gallery.querySelector(".photo-gallery__item") !== null;
    gallery.classList.toggle("photo-gallery--empty", !hasPhotos);

    if (hasPhotos && emptyState.parentNode === gallery) {
      emptyState.remove();
    } else if (!hasPhotos && emptyState.parentNode !== gallery) {
      gallery.appendChild(emptyState);
    }
  }

  function updateUploadList() {
    var hasQueuedPhotos = queuedPhotos.length > 0;
    var hasUploadablePhotos = queuedPhotos.some(function (entry) {
      return !entry.isTooLarge;
    });

    uploadList.hidden = !hasQueuedPhotos;
    uploadAllButton.hidden = !hasUploadablePhotos;
  }

  function removePhoto(item, previewUrl) {
    var urlIndex = previewUrls.indexOf(previewUrl);
    if (urlIndex > -1) previewUrls.splice(urlIndex, 1);
    URL.revokeObjectURL(previewUrl);
    item.remove();
    updateEmptyState();
  }

  function createDeleteAction(file, item, previewUrl) {
    var button = document.createElement("button");
    button.className = "photo-gallery__action photo-gallery__action--delete";
    button.type = "button";
    button.setAttribute("aria-label", file.name + " 삭제");
    button.appendChild(createActionIcon("../../assets/images/figma/photo_action_bg.svg", "photo-gallery__action-bg"));
    button.appendChild(
      createActionIcon("../../assets/images/figma/photo_action_delete.svg", "photo-gallery__action-icon"),
    );
    button.addEventListener("click", function () {
      removePhoto(item, previewUrl);
    });
    return button;
  }

  function addPhoto(file) {
    photoSequence += 1;

    var previewUrl = URL.createObjectURL(file);
    var item = document.createElement("figure");
    var preview = document.createElement("img");
    var caption = document.createElement("figcaption");
    var actions = document.createElement("div");

    previewUrls.push(previewUrl);
    item.className = "photo-gallery__item";
    item.dataset.photoId = String(photoSequence);
    preview.src = previewUrl;
    preview.alt = file.name + " 미리보기";
    preview.loading = "lazy";
    caption.className = "sr-only";
    caption.textContent = file.name;
    actions.className = "photo-gallery__actions";
    actions.appendChild(createDownloadAction(file, previewUrl));
    actions.appendChild(createDeleteAction(file, item, previewUrl));

    item.appendChild(createStoredFileInput(file, photoSequence));
    item.appendChild(preview);
    item.appendChild(caption);
    item.appendChild(actions);
    gallery.appendChild(item);
    updateEmptyState();
  }

  function removeQueuedPhoto(entry) {
    var entryIndex = queuedPhotos.indexOf(entry);
    if (entryIndex > -1) queuedPhotos.splice(entryIndex, 1);
    entry.row.remove();
    updateUploadList();
  }

  function uploadQueuedPhoto(entry) {
    if (entry.isTooLarge) return;
    addPhoto(entry.file);
    removeQueuedPhoto(entry);
  }

  function createUploadRow(file) {
    queueSequence += 1;

    var item = document.createElement("li");
    var removeButton = document.createElement("button");
    var removeIcon = document.createElement("img");
    var fileName = document.createElement("span");
    var uploadButton = document.createElement("button");
    var isTooLarge = file.size > MAX_FILE_SIZE;
    var entry = {
      id: queueSequence,
      file: file,
      isTooLarge: isTooLarge,
      row: item,
    };

    item.className = "upload-item" + (isTooLarge ? " upload-item--error" : "");
    item.dataset.queueId = String(queueSequence);
    removeButton.className = "upload-item__remove";
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", file.name + " 선택 취소");
    removeIcon.src = "../../assets/images/figma/file_remove.svg";
    removeIcon.alt = "";
    removeIcon.setAttribute("aria-hidden", "true");
    removeButton.appendChild(removeIcon);

    fileName.className = "upload-item__name";
    fileName.appendChild(document.createTextNode(file.name + " (" + formatFileSize(file.size) + ")"));
    if (isTooLarge) {
      var errorText = document.createElement("strong");
      errorText.textContent =
        " File is too big (" + (file.size / (1024 * 1024)).toFixed(2) + "MiB). Max filesize: 10MiB.";
      fileName.appendChild(errorText);
    }

    uploadButton.className = "btn";
    uploadButton.type = "button";
    uploadButton.textContent = "업로드";
    uploadButton.disabled = isTooLarge;

    removeButton.addEventListener("click", function () {
      removeQueuedPhoto(entry);
    });
    uploadButton.addEventListener("click", function () {
      uploadQueuedPhoto(entry);
    });

    item.appendChild(removeButton);
    item.appendChild(fileName);
    item.appendChild(uploadButton);
    uploadList.appendChild(item);
    queuedPhotos.push(entry);
  }

  function addSelectedPhotos(input) {
    Array.prototype.slice.call(input.files || []).forEach(function (file) {
      if (isImageFile(file)) createUploadRow(file);
    });
    input.value = "";
    updateUploadList();
  }

  function uploadAllQueuedPhotos() {
    queuedPhotos.slice().forEach(function (entry) {
      uploadQueuedPhoto(entry);
    });
  }

  sourceInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      addSelectedPhotos(input);
    });
  });

  uploadAllButton.addEventListener("click", function () {
    uploadAllQueuedPhotos();
  });

  updateUploadList();

  window.addEventListener("beforeunload", function () {
    previewUrls.forEach(function (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    });
  });
})();
