import express from 'express';
import { testWeatherAI } from '../controllers/test.controller.js';

const router = express.Router();

router.get('/weather-test', testWeatherAI);
export default router;