// downloadZipFromDrive.js
import fs from "fs";
import path from "path";
import { google } from "googleapis";
import archiver from "archiver";

const KEY_PATH = "./google-service-account.json"; // Your downloaded key
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

export const downloadDriveFolderAsZip = async (folderId, zipOutputPath) => {
  const zip = archiver("zip", { zlib: { level: 9 } });
  const output = fs.createWriteStream(zipOutputPath);
  zip.pipe(output);

  const files = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
  });

  for (const file of files.data.files) {
    if (file.mimeType === "application/vnd.google-apps.folder") continue; // skip subfolders

    const fileStream = await drive.files.get(
      { fileId: file.id, alt: "media" },
      { responseType: "stream" }
    );

    zip.append(fileStream.data, { name: file.name });
  }

  await zip.finalize();
  return zipOutputPath;
};
