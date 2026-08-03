import mongoose, { Schema, Document } from "mongoose";

export interface IResult extends Document {
  attemptId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  examId: mongoose.Types.ObjectId;

  score: number;
  totalMarks: number;
  percentage: number;

  correctAnswers: number;
  wrongAnswers: number;

  status: "PASS" | "FAIL";
}

const ResultSchema = new Schema(
  {
    attemptId: {
      type: Schema.Types.ObjectId,
      ref: "ExamAttempt",
      required: true,
      unique: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    wrongAnswers: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PASS", "FAIL"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResult>(
  "Result",
  ResultSchema
);