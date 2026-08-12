import { Request, Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware";

import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../services/exam.service";

import {
  getQuestionsByQuestionPaper,
} from "../../question/services/question.service";

// =====================================================
// CREATE EXAM
// =====================================================

export const addExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    console.log("========== CREATE EXAM ==========");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const {questionPaperId} = req.body;

    if (!questionPaperId) {
      res.status(400).json({
        success: false,
        message: "Question Paper is required",
      });
      return;
    }

    // =====================================================
    // GET QUESTIONS FROM QUESTION PAPER
    // =====================================================

    const questions =
      await getQuestionsByQuestionPaper(questionPaperId);

    console.log(
      "QUESTIONS IN QUESTION PAPER:",
      questions.length,
    );

    // =====================================================
    // CALCULATE TOTAL QUESTIONS
    // =====================================================

    const totalQuestions = questions.length;

    // =====================================================
    // CALCULATE TOTAL MARKS
    // =====================================================

    const totalMarks = questions.reduce(
      (total, question) => {
        return total + (question.marks || 0);
      },
      0,
    );

    console.log("TOTAL QUESTIONS:", totalQuestions);
    console.log("TOTAL MARKS:", totalMarks);

    // =====================================================
    // CREATE EXAM
    // =====================================================

    const exam = await createExam({
      ...req.body,

      // Never trust these values from frontend
      totalQuestions,
      totalMarks,

      // Always take creator from authenticated user
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Exam Created Successfully",
      data: exam,
    });
  } catch (error) {
    console.error("CREATE EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// =====================================================
// GET ALL EXAMS
// =====================================================

export const getExams = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const exams = await getAllExams();

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error("GET EXAMS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================================
// GET EXAM BY ID
// =====================================================

export const getExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await getExamById(id);

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error("GET EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================================
// UPDATE EXAM
// =====================================================

export const editExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await updateExam(
      id,
      req.body,
    );

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Exam Updated Successfully",
      data: exam,
    });
  } catch (error) {
    console.error("UPDATE EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================================
// PUBLISH EXAM
// =====================================================

export const publishExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await updateExam(id, {
      status: "Published",
    });

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Exam Published Successfully",
      data: exam,
    });
  } catch (error) {
    console.error("PUBLISH EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================================
// COMPLETE EXAM
// =====================================================

export const closeExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await updateExam(id, {
      status: "Completed",
    });

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Exam Completed Successfully",
      data: exam,
    });
  } catch (error) {
    console.error("COMPLETE EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================================
// DELETE EXAM
// =====================================================

export const removeExam = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await deleteExam(id);

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Exam Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE EXAM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};