import { Request, Response } from "express";
import { evaluateExam } from "../services/evaluation.service";

import {
  createExamAttempt,
  getAllExamAttempts,
  getExamAttemptById,
  getAttemptsByStudent,
  getStudentExamAttempt,
  updateExamAttempt,
  deleteExamAttempt,
} from "../services/examAttempt.service";

// Start Exam
export const startExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { studentId, examId } = req.body;

    // Check if student already started
    const existingAttempt =
      await getStudentExamAttempt(
        studentId,
        examId
      );

    if (existingAttempt) {
      res.json({
        success: true,
        message: "Existing Attempt Found",
        data: existingAttempt,
      });
      return;
    }

    const attempt =
      await createExamAttempt({
        studentId,
        examId,
      });

    res.status(201).json({
      success: true,
      message: "Exam Started Successfully",
      data: attempt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Attempts
export const getExamAttempts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attempts =
      await getAllExamAttempts();

    res.json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Attempt By ID
export const getExamAttempt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attempt =
      await getExamAttemptById(
        req.params.id as string
      );

    if (!attempt) {
      res.status(404).json({
        success: false,
        message: "Attempt Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Attempts By Student
export const getStudentAttempts =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const attempts =
        await getAttemptsByStudent(
          req.params.studentId as string
        );

      res.json({
        success: true,
        data: attempts,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

// Submit Exam
export const submitExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attemptId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    // Evaluate Exam
    const result = await evaluateExam(attemptId);

    // Update Exam Attempt
    const updatedAttempt = await updateExamAttempt(
      attemptId,
      {
        score: result.totalMarks,
        totalMarks: result.totalMarks,
        status: "Completed",
        submittedAt: new Date(),
      }
    );

    res.json({
      success: true,
      message: "Exam Submitted Successfully",
      result,
      attempt: updatedAttempt,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Attempt
export const removeExamAttempt =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await deleteExamAttempt(
        req.params.id as string
      );

      res.json({
        success: true,
        message:
          "Attempt Deleted Successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

 