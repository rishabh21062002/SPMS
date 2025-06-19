// utils/updateAllUsersFromCodeforces.js

import axios from 'axios';
import User from '../models/User.js';

const updateAllUsersFromCodeforces = async () => {
  try {
    // Step 1: Get all users from DB
    const users = await User.find({}, 'handle'); // only get the 'handle' field
    const handles = users.map(user => user.handle);

    if (handles.length === 0) {
      console.log("⚠️ No users found in database.");
      return;
    }

    console.log(`🔍 Found ${handles.length} users. Updating from Codeforces...`);

    // Step 2: Codeforces allows max ~100 handles per request, so split into batches
    const BATCH_SIZE = 100;
    for (let i = 0; i < handles.length; i += BATCH_SIZE) {
      const batchHandles = handles.slice(i, i + BATCH_SIZE).join(';');

      const res = await axios.get(`https://codeforces.com/api/user.info?handles=${batchHandles}`);
      const cfUsers = res.data.result;

      // Step 3: Upsert each user into DB
      for (const user of cfUsers) {
        const {
          handle,
          rating,
          maxRating,
          rank,
          maxRank,
          registrationTimeSeconds,
          lastOnlineTimeSeconds
        } = user;

        await User.findOneAndUpdate(
          { handle },
          {
            $set: {
              rating: rating || null,
              maxRating: maxRating || null,
              rank: rank || null,
              maxRank: maxRank || null,
              registrationTimeSeconds: registrationTimeSeconds || null,
              lastOnlineTimeSeconds: lastOnlineTimeSeconds || null
            }
          },
          { upsert: true, new: true }
        );

        console.log(`✅ Updated: ${handle}`);
      }
    }

    console.log('✅ All user data updated successfully.');

  } catch (error) {
    console.error("❌ Error updating users:", error.message);
  }
};

export default updateAllUsersFromCodeforces;
