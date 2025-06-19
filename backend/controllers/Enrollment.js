import axios from "axios";
import User from "../models/User.js";
import Submission from "../models/Submission.js";
export const addUser = async (req,res)=>{
const { handle, email, PhoneNumber } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ handle });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Fetch user info and submissions from Codeforces
    const [infoRes, subRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
    ]);

    const userInfo = infoRes.data.result[0];
    const submissionsData = subRes.data.result;

    // Initialize sets and rating trackers
    const solvedSet = new Set();
    const unsolvedSet = new Set();
    let highestRating = 0;
    let lowestRating = Infinity;

    // Create an empty user first
    const newUser = new User({
      handle,
      email,
      PhoneNumber,
      rating: userInfo.rating || null,
      maxRating: userInfo.maxRating || null,
      rank: userInfo.rank || null,
      maxRank: userInfo.maxRank || null,
      result: [],
    });

    // Iterate over submissions and store only new ones
    for (const sub of submissionsData) {
      const exists = await Submission.findOne({ submissionId: sub.id });
      if (exists) continue;

      const submission = await Submission.create({
        handle: sub.author.members[0].handle,
        submissionId: sub.id,
        contestId: sub.contestId,
        problem: sub.problem,
        verdict: sub.verdict,
        programmingLanguage: sub.programmingLanguage,
        testset: sub.testset,
        passedTestCount: sub.passedTestCount,
        timeConsumedMillis: sub.timeConsumedMillis,
        memoryConsumedBytes: sub.memoryConsumedBytes,
        participantType: sub.author.participantType,
        ghost: sub.author.ghost,
        startTimeSeconds: sub.author.startTimeSeconds,
        creationTimeSeconds: sub.creationTimeSeconds
      });

      newUser.result.push(submission._id);

      const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
      if (sub.verdict === 'OK') {
        solvedSet.add(problemKey);
        if (sub.problem.rating) {
          highestRating = Math.max(highestRating, sub.problem.rating);
          lowestRating = Math.min(lowestRating, sub.problem.rating);
        }
      } else {
        if (!solvedSet.has(problemKey)) {
          unsolvedSet.add(problemKey);
        }
      }
    }

    newUser.numberOfquestionSolved = solvedSet.size;
    newUser.numberOfquestionUnsolved = unsolvedSet.size;
    newUser.highestRatedQuestionSolved = highestRating || null;
    newUser.lowestRatedQuestionSolved = lowestRating === Infinity ? null : lowestRating;

    await newUser.save();

    res.status(201).json({ message: "User added and submissions fetched", user: newUser });
  } catch (error) {
    console.error("❌ Error adding user:", error);
    res.status(500).json({ message: "Failed to add user" });
}
}

export const deleteUser = async (req,res)=>{
const { handle } = req.body;
console.log(handle);
  try {
    // Find user by handle
    const user = await User.findOne({ handle });

    if (!user) {
      return res.status(404).json({ message: `User with handle "${handle}" not found.` });
    }

    // Delete all submissions associated with this user
    await Submission.deleteMany({ handle });

    // Now delete the user
    await User.findOneAndDelete({ handle });

    res.json({ message: `✅ User "${handle}" and all their submissions deleted successfully.` });
  } catch (error) {
    console.error("❌ Error deleting user and submissions:", error.message);
    res.status(500).json({ message: "Internal Server Error while deleting user and submissions." });
  }
}

export const getAllUsers = async (req,res)=>{
 try {
    const users = await User.find().populate('result');
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

// module.exports = { addUser, deleteUser, getAllUsers };