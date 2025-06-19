import axios from 'axios';
import User from '../models/User.js';
import Submission from '../models/Submission.js';

export const UserInfo = async (req, res) => {
  try {
    const user = await User.findOne({handle: req.body.handle}).populate('result');
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user info from Codeforces' });
  }
};
