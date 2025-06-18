import express from 'express';
import { UserInfo } from '../controllers/UserInfo.js';

const router = express.Router();

router.get('/user/:handle', UserInfo);

export default router;
