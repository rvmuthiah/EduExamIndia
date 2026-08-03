import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  examId: mongoose.Types.ObjectId;

  question: string;

  optionA: string;

  optionB: string;

  optionC: string;

  optionD: string;

  correctAnswer: string;

  marks: number;

  negativeMarks: number;

  difficulty: string;

  chapter: string;

  explanation?: string;

  status: string;
}

const QuestionSchema = new Schema(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    optionA: {
      type: String,
      required: true,
    },

    optionB: {
      type: String,
      required: true,
    },

    optionC: {
      type: String,
      required: true,
    },

    optionD: {
      type: String,
      required: true,
    },

    correctAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },

    marks: {
      type: Number,
      default: 1,
    },

    negativeMarks: {
      type: Number,
      default: 0,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    chapter: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>(
  "Question",
  QuestionSchema
);