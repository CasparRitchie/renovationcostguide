const path = require("path");
const {
  uploadBufferToDropbox,
  uploadJsonToDropbox,
} = require("./dropbox.service");

function safeFileName(name = "photo") {
  return name
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function createBriefId() {
  const now = new Date();
  const datePart = now.toISOString().replace(/[:.]/g, "-");
  const randomPart = Math.random().toString(36).slice(2, 8);

  return `garden-${datePart}-${randomPart}`;
}

async function saveGardenDesignBrief({ brief, photos }) {
  const briefId = createBriefId();

  const baseDropboxPath = `/renovation-cost-guide/garden-design/${briefId}`;
  const uploadedPhotos = [];

  for (const photo of photos) {
    const filename = safeFileName(photo.originalname);
    const dropboxPath = `${baseDropboxPath}/photos/${filename}`;

    await uploadBufferToDropbox({
      dropboxPath,
      buffer: photo.buffer,
      contentType: photo.mimetype,
    });

    uploadedPhotos.push({
      originalName: photo.originalname,
      fileName: filename,
      mimeType: photo.mimetype,
      size: photo.size,
      dropboxPath,
    });
  }

  const record = {
    briefId,
    submittedAt: new Date().toISOString(),
    brief,
    uploadedPhotos,
    status: "brief_received",
  };

  const jsonPath = `${baseDropboxPath}/brief.json`;

  await uploadJsonToDropbox({
    dropboxPath: jsonPath,
    data: record,
  });

  return {
    briefId,
    photoCount: uploadedPhotos.length,
    jsonPath,
    uploadedPhotos,
  };
}

module.exports = {
  saveGardenDesignBrief,
};
