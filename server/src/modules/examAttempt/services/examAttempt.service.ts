import ExamAttempt, {
  IExamAttempt,
} from "../models/examAttempt.model";

// Create Attempt
export const createExamAttempt = async (
  data: Partial<IExamAttempt>
) => {
  return await ExamAttempt.create(data);
};

// Get All Attempts
export const getAllExamAttempts = async () => {
  return await ExamAttempt.find()
    .populate("studentId", "name email")
    .populate("examId", "title");
};

// Get Attempt By ID
export const getExamAttemptById = async (
  id: string
) => {
  return await ExamAttempt.findById(id)
    .populate("studentId", "name email")
    .populate("examId", "title");
};

// Get Attempts By Student
export const getAttemptsByStudent = async (
  studentId: string
) => {
  return await ExamAttempt.find({
    studentId,
  }).populate("examId", "title");
};

// Get Attempt By Student & Exam
export const getStudentExamAttempt = async (
  studentId: string,
  examId: string
) => {
  return await ExamAttempt.findOne({
    studentId,
    examId,
  });
};

// Update Attempt
export const updateExamAttempt = async (
  id: string,
  data: Partial<IExamAttempt>
) => {
  return await ExamAttempt.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// Delete Attempt
export const deleteExamAttempt = async (
  id: string
) => {
  return await ExamAttempt.findByIdAndDelete(id);
};