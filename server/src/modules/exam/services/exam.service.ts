import Exam, { IExam } from "../models/exam.model";

// =====================================================
// CREATE EXAM
// =====================================================

export const createExam = async (
  data: Partial<IExam>,
) => {
  return await Exam.create(data);
};

// =====================================================
// GET ALL EXAMS
// =====================================================

export const getAllExams = async () => {
  return await Exam.find()
    .populate("questionPaperId", "title")
    .sort({createdAt: -1});
};

// =====================================================
// GET EXAM BY ID
// =====================================================

export const getExamById = async (
  id: string,
) => {
  return await Exam.findById(id)
    .populate("questionPaperId", "title");
};

// =====================================================
// UPDATE EXAM
// =====================================================

export const updateExam = async (
  id: string,
  data: Partial<IExam>,
) => {
  return await Exam.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("questionPaperId", "title");
};
// =====================================================
// DELETE EXAM
// =====================================================

export const deleteExam = async (
  id: string,
) => {
  return await Exam.findByIdAndDelete(id);
};

// =====================================================
// GET PUBLISHED EXAM
// =====================================================

export const getPublishedExamById = async (
  id: string,
) => {
  return await Exam.findOne({
    _id: id,
    status: "Published",
  }).populate("questionPaperId", "title");
};

// =====================================================
// VALIDATE EXAM TIME
// =====================================================

export const validateExamTime = (
  exam: IExam,
) => {
  const now = new Date();

  if (exam.status !== "Published") {
    throw new Error("Exam is not published");
  }

  if (!exam.startDate || !exam.endDate) {
    throw new Error(
      "Exam start date and end date are not configured",
    );
  }

  if (now < exam.startDate) {
    throw new Error("Exam has not started yet");
  }

  if (now > exam.endDate) {
    throw new Error("Exam has already ended");
  }

  return true;
};