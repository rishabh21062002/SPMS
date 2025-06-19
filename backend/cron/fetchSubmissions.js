// cron/fetchSubmissions.js
import axios from 'axios';
import Submission from '../models/Submission.js';
import User from '../models/User.js';

const fetchAndStoreSubmissions = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const handle = user.handle;

      const infoURL = `https://codeforces.com/api/user.info?handles=${handle}`;
      const submissionsURL = `https://codeforces.com/api/user.status?handle=${handle}`;

      const [infoRes, subRes] = await Promise.all([
        axios.get(infoURL),
        axios.get(submissionsURL)
      ]);

      const userInfo = infoRes.data.result[0];
      const submissionsData = subRes.data.result;

      const solvedSet = new Set();
      const unsolvedSet = new Set();
      let highestRating = 0;
      let lowestRating = Infinity;

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

        user.result.push(submission._id);

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

      user.rating = userInfo.rating || null;
      user.maxRating = userInfo.maxRating || null;
      user.rank = userInfo.rank || null;
      user.maxRank = userInfo.maxRank || null;
      user.numberOfquestionSolved = solvedSet.size;
      user.numberOfquestionUnsolved = unsolvedSet.size;
      user.highestRatedQuestionSolved = highestRating || null;
      user.lowestRatedQuestionSolved = lowestRating === Infinity ? null : lowestRating;

      await user.save();

      console.log(`✅ Updated ${handle}: ${solvedSet.size} solved, ${unsolvedSet.size} unsolved.`);
    }
  } catch (error) {
    console.error('❌ Error in cron job:', error);
  }
};

export default fetchAndStoreSubmissions;
