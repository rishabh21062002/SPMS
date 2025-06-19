import mongoose from 'mongoose';
import Submission from './Submission.js';

const UserSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: null
  },
  maxRating: {
    type: Number,
    default: null
  },
  rank: {
    type: String,
    default: null
  },
  maxRank: {
    type: String,
    default: null
  },
  email:{
    type: String,
    default: null
  },
  PhoneNumber:{
    type: String,
    default: null
  },
  result: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }],
  numberOfquestionSolved: {
    type: Number
  },
  numberOfquestionUnsolved: {
    type: Number
  },
  highestRatedQuestionSolved: {
    type: Number
  },
  lowestRatedQuestionSolved: {
    type: Number
  }
}, {
  timestamps: true
});
const User = mongoose.model('User',UserSchema);

export default User;