import express from 'express';
import { createFarmer, getFarmers } from '../controllers/farmer.controller.js';

const router = express.Router();

router.post('/', createFarmer);
router.get('/', getFarmers);

export default router;