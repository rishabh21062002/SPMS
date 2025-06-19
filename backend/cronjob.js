const cron = require('node-cron');
const axios = require('axios');
const fetchAndStoreSubmissions = require('./cron/fetchSubmissions');
const updateAllUsersFromCodeforces = require('./cron/upadteUsersFromCodeforces')
// Run at 2:00 AM daily
cron.schedule('0 2 * * *', async () => {
  console.log('⏰ Cron job running at 2:00 AM');

  try {
      await fetchAndStoreSubmissions();
      console.log('✅ Cron job completed');
    } catch (error) {
      console.error('❌ Error running cron job:', error.message);
    }
     try {
      await updateAllUsersFromCodeforces();
      console.log('✅ User update at 2 am');
    } catch (error) {
      console.error('❌ Error running in updating the user from codeforces:', error.message);
    }
});
 