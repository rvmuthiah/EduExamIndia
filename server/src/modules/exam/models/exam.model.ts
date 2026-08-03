import mongoose, { Schema, Document } from "mongoose";

export interface IExam extends Document {
  title: string;
  board: string;
  standard: number;
  subject: string;
  questionPaper: mongoose.Types.ObjectId;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  startDate: Date;
  endDate: Date;
  status: string;
}

const ExamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    board: {
      type: String,
      required: true,
    },

    standard: {
      type: Number,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    questionPaper: {
      type: Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      default: 30,
    },

    totalQuestions: {
      type: Number,
      required: true,
      default: 100,
    },

    totalMarks: {
      type: Number,
      required: true,
      default: 100,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Published", "Completed"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExam>("Exam", ExamSchema);