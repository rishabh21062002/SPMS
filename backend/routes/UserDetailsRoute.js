import experss from 'express';
import { getRating, getQuestionsUnsolved, getExtraData, generateCsv } from '../controllers/UserDetails.js';

const router = experss.Router();

// return rating + date of contest (with name and more details) + Filter for days
router.get('/getRating', getRating);
// return questions unsolved for each contest
router.get('/questionsUnsolved', getQuestionsUnsolved);
// Most difficult problem solved (by rating) Total problems solved Average rating Average problems per day Bar chart of number of problems solved per rating bucket Show a submission heat map
router.get('/extraData', getExtraData);

router.get('/getCsv', generateCsv);


export default router;