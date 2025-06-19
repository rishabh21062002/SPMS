import express from 'express';
import User from '../models/User.js';
import { addUser, deleteUser, getAllUsers } from '../controllers/Enrollment.js';

const router = express.Router();

router.post('/add-user', addUser);
router.get('/get-all-users', getAllUsers);
router.post('/delete-user', deleteUser);

export default router;