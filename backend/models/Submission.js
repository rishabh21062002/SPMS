// models/Submission.js

import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  handle: { 
    type: String, 
    required: true 
  },
  submissionId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  contestId: {
    type: Number
  },
  problem: {
    index: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    rating: {
      type: Number
    },
    points: {
      type: Number
    },
    tags: [String]
  },

  verdict: {
    type: String
  }, // OK, WRONG_ANSWER, etc.
  programmingLanguage: {
    type: String
  },
  testset: {
    type: String
  },
  passedTestCount: {
    type: Number
  },
  timeConsumedMillis: {
    type: Number
  },
  memoryConsumedBytes: {
    type: Number
  },

  participantType: {
    type: String
  }, // CONTESTANT / PRACTICE
  ghost: {
    type: Boolean
  },
  startTimeSeconds: {
    type: Number
  },
  creationTimeSeconds: {
    type: Number
  }
}, { timestamps: true });

export default mongoose.model("Submission", SubmissionSchema);
