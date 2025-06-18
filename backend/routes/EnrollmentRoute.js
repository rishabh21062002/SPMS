import express from 'express';
import User from '../models/User';
const { addUser, deleteUser, getAllUsers } = require('../controllers/Enrollment');

const router = express.Router();

router.post('/add-user', addUser);
router.get('/get-all-users', getAllUsers);
router.post('/delete-user', deleteUser);



export default router;