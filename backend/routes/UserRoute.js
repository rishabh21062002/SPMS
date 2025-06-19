import express from 'express';
import { UserInfo } from '../controllers/UserInfo.js';

const router = express.Router();

router.post('/user', UserInfo);

export default router;
