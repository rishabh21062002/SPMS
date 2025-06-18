import axios from 'axios';

export const UserInfo = async (req, res) => {
  try {
    const { handle } = req.params;
    console.log("Handle:", handle);

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    const response = await axios.get(url);

    const userInfo = response.data.result[0]; // Only one user expected

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
