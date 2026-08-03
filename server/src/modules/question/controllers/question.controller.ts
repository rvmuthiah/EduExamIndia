import { Request, Response } from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByExam,
  updateQuestion,
  deleteQuestion,
} from "../services/question.service";

// Create Question
export const addQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const question = await createQuestion(req.body);

    res.status(201).json({
      success: true,
      message: "Question Created Successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Questions
export const getQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await getAllQuestions();

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Question By ID
export const getQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

const question = await getQuestionById(id);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Questions By Exam ID
export const getExamQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const examId = Array.isArray(req.params.examId)
  ? req.params.examId[0]
  : req.params.examId;

const questions = await getQuestionsByExam(examId);

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Update Question
export const editQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

const question = await updateQuestion(id, req.body);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question Not Found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Question Updated Successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Delete Question
export const removeQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

await deleteQuestion(id);

    res.json({
      success: true,
      message: "Question Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};