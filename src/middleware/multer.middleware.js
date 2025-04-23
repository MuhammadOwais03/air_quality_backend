import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a directory to store the uploaded firmware
const firmwareDir = path.join(__dirname, "../../firmware");
if (!fs.existsSync(firmwareDir)) {
  fs.mkdirSync(firmwareDir, { recursive: true });
}

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, firmwareDir);  // your target folder for storing files
      cb(null, '/tmp');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);  // unique filename
    },
  });

const upload = multer({ storage });

//hello
export { upload };
