

import express from 'express';
import { getData, getTempHumidity } from '../controllers/temp.controllers.js';

const router = express.Router();

router.post('/', getTempHumidity);
router.get('/get-data', getData);

export default router;