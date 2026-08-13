import mongoose, { Schema, Document } from "mongoose";

export interface IExamAttempt extends Document {
  studentId: mongoose.Types.ObjectId;
  examId: mongoose.Types.ObjectId;

  startedAt: Date;
  endsAt: Date;
  submittedAt?: Date;

  score: number;
  totalMarks: number;
  status: "In Progress" | "Submitted" | "Completed";
}

const ExamAttemptSchema = new Schema(
  {
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

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endsAt: {
  type: Date,
  required: true,
},

    submittedAt: {
      type: Date,
    },

    score: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "In Progress",
        "Submitted",
        "Completed",
      ],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExamAttempt>(
  "ExamAttempt",
  ExamAttemptSchema
);