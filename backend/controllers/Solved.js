import axios from 'axios';

export const getUserSolvedCount = async (req, res) => {
  try {
    console.log("req.params:", req.params);
    const { handle } = req.params;
    const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
   
    const response = await axios.get(url);
    console.log(response.data); 
    const submissions = response.data.result;
    // console.log(response);
    const oneWeekAgo = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);
    const solvedSet = new Set();

    submissions.forEach((submission) => {
      if (
        submission.verdict === 'OK' &&
        submission.creationTimeSeconds >= oneWeekAgo
      ) {
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
     
      }
    });

    res.json({
      handle,
      solvedInLast7Days: solvedSet.size,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data from Codeforces' });
  }
};
