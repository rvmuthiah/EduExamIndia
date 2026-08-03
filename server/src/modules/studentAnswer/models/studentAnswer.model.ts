import mongoose, { Schema, Document } from "mongoose";

export interface IStudentAnswer extends Document {
  attemptId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;

  selectedAnswer: string;

  isCorrect: boolean;

  marksAwarded: number;
}

const StudentAnswerSchema = new Schema(
  {
    attemptId: {
      type: Schema.Types.ObjectId,
      ref: "ExamAttempt",
      required: true,
    },

    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    selectedAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    marksAwarded: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudentAnswer>(
  "StudentAnswer",
  StudentAnswerSchema
);