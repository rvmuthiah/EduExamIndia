import mongoose, { Schema, Document } from "mongoose";

export interface IQuestionPaper extends Document {
  title: string;
  board: string;
  standard: number;
  subject: string;
  chapter?: string;
  examType: string;
  pdfFile: string;
  uploadedBy: mongoose.Types.ObjectId;
  status: string;
}

const QuestionPaperSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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

    pdfFile: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestionPaper>(
  "QuestionPaper",
  QuestionPaperSchema
);