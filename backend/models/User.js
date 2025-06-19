import mongoose from 'mongoose';

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
}, {
  timestamps: true
});
const User = mongoose.model('User',UserSchema);

export default User;