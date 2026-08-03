import Question, { IQuestion } from "../models/question.model";

// Create Question
export const createQuestion = async (
  data: Partial<IQuestion>
) => {
  return await Question.create(data);
};

// Get All Questions
export const getAllQuestions = async () => {
  return await Question.find().populate("examId", "title");
};

// Get Question By ID
export const getQuestionById = async (id: string) => {
  return await Question.findById(id).populate("examId", "title");
};

// Get Questions By Exam
export const getQuestionsByExam = async (
  examId: string
) => {
  return await Question.find({ examId });
};

// Update Question
export const updateQuestion = async (
  id: string,
  data: Partial<IQuestion>
) => {
  return await Question.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete Question
export const deleteQuestion = async (id: string) => {
  return await Question.findByIdAndDelete(id);
};