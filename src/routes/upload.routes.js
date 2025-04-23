




import express from 'express';
import { uploadFirmware, getFirmware } from '../controllers/upload.controllers.js';
import { upload } from '../middleware/multer.middleware.js';
import { get } from 'http';

const Uploadrouter = express.Router();

Uploadrouter.post('/', upload.array("firmware"), uploadFirmware);
Uploadrouter.get('/get-firmware', getFirmware);


export default Uploadrouter;