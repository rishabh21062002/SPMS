import express from 'express';
import { updateHandle } from '../controllers/UpdateHandle';

const router = express.Router();

// old handle , new handle -> new handle verification -> db old handle data will be replaced by new handle data fetched from api
// last updated
router.post("/update-handle", updateHandle);

export default router