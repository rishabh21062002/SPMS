// cron/fetchSubmissions.js
const axios = require('axios');
const Submission = require('../models/Submission');
const User = require('../models/User');

const fetchAndStoreSubmissions = async () => {
  try {
    const user = User.findAll({});
    for(const u of user){
      console.log(u.handle);
      const handle = u.handle;
      console.log("Handle:", handle);

      const url = `https://codeforces.com/api/user.info?handles=${handle}`;
      const suburl = `https://codeforces.com/api/user.status?handle=${handle}`;
      const response = await axios.get(url);
      const userInfo = response.data.result[0]; // Only one user expected

      // const newUser = new User({
      //   handle: userInfo.handle,
      //   rating: userInfo.rating,
      //   maxRating: userInfo.maxRating,
      //   rank: userInfo.rank,
      //   maxRank: userInfo.maxRank,
      //   email: u.email,
      //   PhoneNumber: u.PhoneNumber,
      // });
      const oldUser = user.findOne({where: {handle: u.hanle}});

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
        old.result.push(submission._id);
      };

      await newUser.save();

      // res.json({
      //   handle: userInfo.handle,
      //   rating: userInfo.rating,
      //   maxRating: userInfo.maxRating,
      //   rank: userInfo.rank,
      //   registrationTime: new Date(userInfo.registrationTimeSeconds * 1000),
      // });
    }
    }catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'Failed to fetch user info from Codeforces' });
    }
    

  // const users = await User.find();

  // for (const user of users) {
  //   const handle = user.handle;
  //   console.log(`🔍 Fetching submissions for ${handle}`);

  //   const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
  //   const submissions = response.data.result;

  //   let added = 0, skipped = 0;

  //   for (const item of submissions) {
  //     const {
  //       id,
  //       contestId,
  //       creationTimeSeconds,
  //       problem,
  //       author,
  //       programmingLanguage,
  //       verdict,
  //       testset,
  //       passedTestCount,
  //       timeConsumedMillis,
  //       memoryConsumedBytes
  //     } = item;

  //     const exists = await Submission.findOne({ submissionId: id });
  //     if (exists) {
  //       skipped++;
  //       continue;
  //     }

  //     const newSubmission = new Submission({
  //       handle,
  //       submissionId: id,
  //       contestId,
  //       creationTimeSeconds,
  //       creationDate: new Date(creationTimeSeconds * 1000),
  //       problem: {
  //         index: problem.index,
  //         name: problem.name,
  //         type: problem.type,
  //         rating: problem.rating || null,
  //         points: problem.points || null,
  //         tags: problem.tags || []
  //       },
  //       verdict,
  //       programmingLanguage,
  //       testset,
  //       passedTestCount,
  //       timeConsumedMillis,
  //       memoryConsumedBytes,
  //       participantType: author.participantType,
  //       ghost: author.ghost,
  //       room: author.room || null,
  //       startTimeSeconds: author.startTimeSeconds
  //     });

  //     await newSubmission.save();
  //     added++;
  //   }

  //   console.log(`✅ ${handle}: Added ${added}, Skipped ${skipped}`);
  // }
};

module.exports = fetchAndStoreSubmissions;
