import Result, { IResult } from "../models/result.model";

// Create Result
export const createResult = async (
  data: Partial<IResult>
) => {
  return await Result.create(data);
};

// Get All Results
export const getAllResults = async () => {
  return await Result.find()
    .populate("studentId")
    .populate("examId");
};

// Get Result By ID
export const getResultById = async (id: string) => {
  return await Result.findById(id)
    .populate("studentId")
    .populate("examId");
};

// Get Result By Attempt
export const getResultByAttempt = async (
  attemptId: string
) => {
  return await Result.findOne({
    attemptId,
  })
    .populate("studentId")
    .populate("examId");
};

// Get Student Results
export const getStudentResults = async (
  studentId: string
) => {
  return await Result.find({
    studentId,
  }).populate("examId");
};

// Update Result
export const updateResult = async (
  id: string,
  data: Partial<IResult>
) => {
  return await Result.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// Delete Result
export const deleteResult = async (
  id: string
) => {
  return await Result.findByIdAndDelete(id);
};