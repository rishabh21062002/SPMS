import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from'mongoose'
import SolvedRoute from './routes/SolvedRoute.js';
import  UserRoute  from './routes/UserRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/codeforces',SolvedRoute);
app.use('/api/codeforces',UserRoute);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(5000, () => console.log('Server started on port 5000'));
})
.catch(err => console.log(err));
