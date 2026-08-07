import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  examId?: mongoose.Types.ObjectId;
  questionPaperId?: mongoose.Types.ObjectId;

  board: string;
  standard: number;
  subject: string;
  chapter: string;

  question: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  correctAnswer: "A" | "B" | "C" | "D";

  marks: number;
  negativeMarks: number;

  difficulty: "Easy" | "Medium" | "Hard";

  explanation?: string;

  status: "Active" | "Inactive";
}

const QuestionSchema = new Schema<IQuestion>(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: false,
    },

    questionPaperId: {
      type: Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: false,
    },

    board: {
      type: String,
      required: true,
      trim: true,
    },

    standard: {
      type: Number,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    chapter: {
      type: String,
      default: "",
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    optionA: {
      type: String,
      required: true,
      trim: true,
    },

    optionB: {
      type: String,
      required: true,
      trim: true,
    },

    optionC: {
      type: String,
      required: true,
      trim: true,
    },

    optionD: {
      type: String,
      required: true,
      trim: true,
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