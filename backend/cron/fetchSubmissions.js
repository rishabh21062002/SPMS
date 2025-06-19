// cron/fetchSubmissions.js
const axios = require('axios');
const Submission = require('../models/Submission');
const User = require('../models/User');

const fetchAndStoreSubmissions = async () => {
  const users = await User.find();

  for (const user of users) {
    const handle = user.handle;
    console.log(`🔍 Fetching submissions for ${handle}`);

    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    const submissions = response.data.result;

    let added = 0, skipped = 0;

    for (const item of submissions) {
      const {
        id,
        contestId,
        creationTimeSeconds,
        problem,
        author,
        programmingLanguage,
        verdict,
        testset,
        passedTestCount,
        timeConsumedMillis,
        memoryConsumedBytes
      } = item;

      const exists = await Submission.findOne({ submissionId: id });
      if (exists) {
        skipped++;
        continue;
      }

      const newSubmission = new Submission({
        handle,
        submissionId: id,
        contestId,
        creationTimeSeconds,
        creationDate: new Date(creationTimeSeconds * 1000),
        problem: {
          index: problem.index,
          name: problem.name,
          type: problem.type,
          rating: problem.rating || null,
          points: problem.points || null,
          tags: problem.tags || []
        },
        verdict,
        programmingLanguage,
        testset,
        passedTestCount,
        timeConsumedMillis,
        memoryConsumedBytes,
        participantType: author.participantType,
        ghost: author.ghost,
        room: author.room || null,
        startTimeSeconds: author.startTimeSeconds
      });

      await newSubmission.save();
      added++;
    }

    console.log(`✅ ${handle}: Added ${added}, Skipped ${skipped}`);
  }
};

module.exports = fetchAndStoreSubmissions;
