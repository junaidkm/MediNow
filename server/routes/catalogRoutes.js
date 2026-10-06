import express from 'express';
import { getServices, getSpecialties, getDoctors } from '../controllers/catalogController.js';

const router = express.Router();

router.get('/services', getServices);
router.get('/specialties', getSpecialties);
router.get('/doctors', getDoctors);

export default router;
