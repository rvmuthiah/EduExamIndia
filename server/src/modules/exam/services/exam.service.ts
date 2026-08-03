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

// Get Published Exam By ID
export const getPublishedExamById = async (
  id: string
) => {
  return await Exam.findOne({
    _id: id,
    status: "Published",
  }).populate("questionPaper");
};

// Validate Exam Time
export const validateExamTime = (
  exam: IExam
) => {

  const now = new Date();

  if (exam.status !== "Published") {
    throw new Error("Exam is not published");
  }

  if (now < exam.startDate) {
    throw new Error("Exam has not started yet");
  }

  if (now > exam.endDate) {
    throw new Error("Exam has already ended");
  }

  return true;
};