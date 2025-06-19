// models/Submission.js

import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  handle: { type: String, required: true }, // Infinity18

  submissionId: { type: Number, required: true, unique: true }, // id
  contestId: Number,
  problem: {
    index: String,
    name: String,
    type: String,
    rating: Number,
    points: Number,
    tags: [String]
  },

  verdict: String, // OK, WRONG_ANSWER, etc.
  programmingLanguage: String,
  testset: String,
  passedTestCount: Number,
  timeConsumedMillis: Number,
  memoryConsumedBytes: Number,

  participantType: String, // CONTESTANT / PRACTICE
  ghost: Boolean,
  room: Number,
  startTimeSeconds: Number,

  creationTimeSeconds: Number,
  creationDate: { type: Date, default: () => new Date() } // parsed from `creationTimeSeconds`
}, { timestamps: true });

export default mongoose.model("Submission", SubmissionSchema);
