import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from'mongoose'
import SolvedRoute from './routes/SolvedRoute.js';
import  UserRoute  from './routes/UserRoute.js';
import EnrollmentRoute from './routes/EnrollmentRoute.js';
import UserDetailsRoute from './routes/UserDetailsRoute.js';
import UpdateHandleRoute from './routes/UpdateHandleRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/codeforces',SolvedRoute);
app.use('/api/codeforces',UserRoute);
app.use('/api',EnrollmentRoute);
app.use('/api/user', UserDetailsRoute);
app.use('/api/handle', UpdateHandleRoute);
app.get('/', (req,res)=>{
  console.log("INside hoem route");
  res.json({"msg":"Hello World"});
});
// import './cronjob';
// cron job -> fetch updated data for all enrolled students
// send mail if user haven't solved question for last 7 days

mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
  app.listen(5001, () => console.log('Server started on port 5001'));
})
.catch(err => console.log(err));
