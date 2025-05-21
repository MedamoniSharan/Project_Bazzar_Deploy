// routes/driveDownload.js
import express from "express";
import { downloadDriveFolderAsZip } from "..DownloadZipFromDrive.js";
const router = express.Router();

router.get("/download-zip/:folderId", async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const zipPath = `./temp/${folderId}.zip`;

    await downloadDriveFolderAsZip(folderId, zipPath);

    res.download(zipPath, "project_download.zip", () => {
      fs.unlinkSync(zipPath); // cleanup after download
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate ZIP from Drive folder" });
  }
});

export default router;
