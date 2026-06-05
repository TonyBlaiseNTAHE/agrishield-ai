import express from 'express';
import { getFarmInsight } from '../controllers/weather.controller.js';

const router = express.Router();

router.get('/farm/:farmId/insight', getFarmInsight);

export default router;