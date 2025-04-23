import express from "express";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { fileURLToPath } from "url";

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname, __filename);

const firmwareDir = path.join(__dirname, "../../firmware");
console.log(firmwareDir);

const uploadFirmware = async (req, res) => {
  if (req.files.length < 3) {
    return res.status(400).json({ message: "Missing firmware files" });
  }

  // Extract the three files
  const [mainBin, mergedBin, partitionBin] = req.files;

  console.log("Received files:");
  console.log("Main Firmware:", mainBin.originalname);
  console.log("Merged Firmware:", mergedBin.originalname);
  console.log("Partition Table:", partitionBin.originalname);

  res.json({ message: "Firmware uploaded successfully!" });
};

const getFirmware = async (req, res) => {
  try {
    const files = fs.readdirSync(firmwareDir);
    const firmwareFile = files.find(file => file.endsWith(".ino.bin"));

    if (!firmwareFile) {
      return res.status(404).json({ message: "No .ino.bin firmware file found" });
    }

    const filePath = path.join(firmwareDir, firmwareFile);
    console.log("Sending file:", filePath);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${firmwareFile}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return;
      }

      // Delete after successful send
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        } else {
          console.log("Firmware file deleted:", firmwareFile);
        }
      });
    });

  } catch (error) {
    console.error("Error in getFirmware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { uploadFirmware, getFirmware };
