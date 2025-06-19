import axios from "axios";
import User from '../models/User.js';

export const getRating = async (req,res)=>{

}

export const getQuestionsUnsolved = async (req,res)=>{
 try {
    const { handle } = req.body;

    const student = await User.findOne({ handle });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const submissions = student.result;

    const solvedSet = new Set();
    const attemptedMap = new Map();

    submissions.forEach((sub) => {
      const key = `${sub.contestId}-${sub.problem.index}`;

      if (sub.verdict === "OK") {
        solvedSet.add(key);
      } else {
        // Only store the first encountered version of the problem
        if (!attemptedMap.has(key)) {
          attemptedMap.set(key, sub.problem);
        }
      }
    });

    const unsolvedProblems = [];

    attemptedMap.forEach((problem, key) => {
      if (!solvedSet.has(key)) {
        unsolvedProblems.push(problem);
      }
    });

    return res.status(200).json({ unsolvedProblems });

  } catch (error) {
    console.error("Error in getQuestionsUnsolved:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export const getExtraData = async (req,res)=>{

}

export const generateCsv = async (req, res)=>{
    
}

// module.exports = { getRating, getQuestionsUnsolved, getExtraData };