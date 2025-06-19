import axios from 'axios';
import User from '../models/User.js';
import Submission from '../models/Submission.js';

export const UserInfo = async (req, res) => {
  try {
    console.log(req.body);
    const handle = req.body.handle;
    console.log("Handle:", handle);

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    const suburl = `https://codeforces.com/api/user.status?handle=${handle}`;
    const response = await axios.get(url);
    const userInfo = response.data.result[0]; // Only one user expected

    const newUser = new User({
      handle: userInfo.handle,
      rating: userInfo.rating,
      maxRating: userInfo.maxRating,
      rank: userInfo.rank,
      maxRank: userInfo.maxRank,
      email: req.body.email,
      PhoneNumber: req.body.PhoneNumber,
    });

    const subResponse = await axios.get(suburl);
    const submissionsData = subResponse.data.result;

    for(const sub of submissionsData){
      console.log(sub);
      console.log(sub.author.members[0].handle);
      console.log(sub.id);
      console.log(sub.contestId);
      console.log(sub.problem);
      console.log(sub.verdict);
      console.log(sub.programmingLanguage);
      console.log(sub.testset);
      console.log(sub.passedTestCount);
      console.log(sub.timeConsumedMillis);
      console.log(sub.memoryConsumedBytes);
      console.log(sub.author.participantType);
      console.log(sub.author.ghost);
      console.log(sub.author.startTimeSeconds);
      console.log(sub.creationTimeSeconds);
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
    };

    await newUser.save();

    res.json({
      handle: userInfo.handle,
      rating: userInfo.rating,
      maxRating: userInfo.maxRating,
      rank: userInfo.rank,
      registrationTime: new Date(userInfo.registrationTimeSeconds * 1000),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user info from Codeforces' });
  }
};
