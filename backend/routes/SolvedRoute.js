import express from 'express';
import { getUserSolvedCount } from '../controllers/Solved.js';

const router = express.Router();

router.get('/solved/:handle', getUserSolvedCount);

export default router;
