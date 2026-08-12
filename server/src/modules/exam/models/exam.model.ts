import mongoose, { Document, Schema } from "mongoose";

export interface IExam extends Document {
  title: string;

  questionPaperId: mongoose.Types.ObjectId;

  board: string;
  standard: number;
  subject: string;
  chapter?: string;

  examType: string;

  durationMinutes: number;

  totalQuestions: number;
  totalMarks: number;

  negativeMarking: boolean;
  negativeMarks: number;

  startDate?: Date;
  endDate?: Date;

  status: "Draft" | "Published" | "Completed" | "Cancelled";

  createdBy: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const examSchema = new Schema<IExam>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    questionPaperId: {
      type: Schema.Types.ObjectId,
      ref: "QuestionPaper",
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

    chapter: {
      type: String,
      default: "",
    },

    examType: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    negativeMarking: {
      type: Boolean,
      default: false,
    },

    negativeMarks: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Completed",
        "Cancelled",
      ],
      default: "Draft",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IExam>(
  "Exam",
  examSchema,
);