import Question, {IQuestion} from "../models/question.model";
import Exam from "../../exam/models/exam.model";

// Create Question
export const createQuestion = async (
  data: Partial<IQuestion>,
) => {
  return await Question.create(data);
};

// Get All Questions
export const getAllQuestions = async () => {
  return await Question.find()
    .populate("examId", "title")
    .populate("questionPaperId", "title")
    .sort({createdAt: -1});
};

// Get Question By ID
export const getQuestionById = async (
  id: string,
) => {
  console.log("========== FIND QUESTION ==========");
  console.log("QUESTION ID RECEIVED:", id);

  const question = await Question.findById(id)
    .populate("examId", "title")
    .populate("questionPaperId", "title");

  console.log("QUESTION FROM DATABASE:", question);

  return question;
};

// Get Questions By Exam
export const getQuestionsByExam = async (
  examId: string,
) => {
  const exam = await Exam.findById(examId);

  if (!exam) {
    return [];
  }

  if (!exam.questionPaperId) {
    return [];
  }

  return await Question.find({
    questionPaperId: exam.questionPaperId,
    status: "Active",
  }).sort({createdAt: -1});
};

// Get Questions By Question Paper
export const getQuestionsByQuestionPaper = async (
  questionPaperId: string,
) => {
  return await Question.find({
    questionPaperId,
    status: "Active",
  }).sort({createdAt: -1});
};

// Update Question
export const updateQuestion = async (
  id: string,
  data: Partial<IQuestion>,
) => {
  return await Question.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

// Delete Question
export const deleteQuestion = async (
  id: string,
) => {
  return await Question.findByIdAndDelete(id);
};