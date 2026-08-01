import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  board: string;
  standard: number;
  school: string;
  parentName: string;
  parentMobile: string;
  subscriptionType: string;
  subscriptionExpiry?: Date;
  status: string;
}

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
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

    school: {
      type: String,
      required: true,
    },

    parentName: {
      type: String,
      required: true,
    },

    parentMobile: {
      type: String,
      required: true,
    },

    subscriptionType: {
      type: String,
      enum: ["Free", "Monthly", "Yearly"],
      default: "Free",
    },

    subscriptionExpiry: {
      type: Date,
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

export default mongoose.model<IStudent>(
  "Student",
  StudentSchema
);