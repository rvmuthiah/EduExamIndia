import { Request, Response } from "express";

import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByExam,
  getQuestionsByQuestionPaper,
  updateQuestion,
  deleteQuestion,
} from "../services/question.service";

// Helper function
const getParam = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
};

// CREATE QUESTION
export const addQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const question = await createQuestion(req.body);

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    console.error("Create Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create question",
    });
  }
};

// GET ALL QUESTIONS
export const getQuestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const questions = await getAllQuestions();

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get questions",
    });
  }
};

// GET SINGLE QUESTION
export const getQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = getParam(req.params.id);

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Question ID is required",
      });
      return;
    }

    const question = await getQuestionById(id);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error("Get Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get question",
    });
  }
};

// GET QUESTIONS BY EXAM
export const getQuestionsForExam = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const examId = getParam(req.params.examId);

    if (!examId) {
      res.status(400).json({
        success: false,
        message: "Exam ID is required",
      });
      return;
    }

    const questions = await getQuestionsByExam(examId);

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Get Exam Questions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get exam questions",
    });
  }
};

// GET QUESTIONS BY QUESTION PAPER
export const getQuestionsForQuestionPaper = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const questionPaperId = getParam(
      req.params.questionPaperId,
    );

    if (!questionPaperId) {
      res.status(400).json({
        success: false,
        message: "Question Paper ID is required",
      });
      return;
    }

    const questions =
      await getQuestionsByQuestionPaper(questionPaperId);

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(
      "Get Question Paper Questions Error:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Failed to get question paper questions",
    });
  }
};

// UPDATE QUESTION
export const editQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = getParam(req.params.id);

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Question ID is required",
      });
      return;
    }

    const question = await updateQuestion(id, req.body);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    console.error("Update Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update question",
    });
  }
};

// DELETE QUESTION
export const removeQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = getParam(req.params.id);

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Question ID is required",
      });
      return;
    }

    const question = await deleteQuestion(id);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Delete Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete question",
    });
  }
};