import Exam, { IExam } from "../models/exam.model";

// Create Exam
export const createExam = async (
  data: Partial<IExam>
) => {
  return await Exam.create(data);
};

// Get All Exams
export const getAllExams = async () => {
  return await Exam.find()
    .populate("questionPaper");
};

// Get Exam By ID
export const getExamById = async (
  id: string
) => {
  return await Exam.findById(id)
    .populate("questionPaper");
};

// Update Exam
export const updateExam = async (
  id: string,
  data: Partial<IExam>
) => {
  return await Exam.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// Delete Exam
export const deleteExam = async (
  id: string
) => {
  return await Exam.findByIdAndDelete(id);
};