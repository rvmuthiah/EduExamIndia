import { Request, Response } from "express";

import {
  createStudentAnswer,
  getAllStudentAnswers,
  getStudentAnswerById,
  getAnswersByAttempt,
  getStudentAnswer,
  updateStudentAnswer,
  deleteStudentAnswer,
} from "../services/studentAnswer.service";
import {
  getExamAttemptById,
} from "../../examAttempt/services/examAttempt.service";

// Auto Save Answer
export const saveAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      attemptId,
      questionId,
      selectedAnswer,
    } = req.body;

    // ==========================================
    // CHECK EXAM ATTEMPT
    // ==========================================

    const attempt = await getExamAttemptById(
      attemptId
    );

    if (!attempt) {
      res.status(404).json({
        success: false,
        message: "Exam Attempt Not Found",
      });
      return;
    }

    // ==========================================
    // CHECK ATTEMPT STATUS
    // ==========================================

    if (attempt.status !== "In Progress") {
      res.status(400).json({
        success: false,
        message: "Exam is no longer active",
      });
      return;
    }

    // ==========================================
    // CHECK EXAM TIME
    // ==========================================

    if (
      new Date() >=
      new Date(attempt.endsAt)
    ) {
      res.status(400).json({
        success: false,
        message: "Exam has already ended",
      });
      return;
    }

    // ==========================================
    // CHECK EXISTING ANSWER
    // ==========================================

    const existingAnswer =
      await getStudentAnswer(
        attemptId,
        questionId
      );

    if (existingAnswer) {
      const updated =
        await updateStudentAnswer(
          String(existingAnswer._id),
          {
            selectedAnswer,
          }
        );

      res.json({
        success: true,
        message: "Answer Updated",
        data: updated,
      });

      return;
    }

    // ==========================================
    // CREATE ANSWER
    // ==========================================

    const answer =
      await createStudentAnswer({
        attemptId,
        questionId,
        selectedAnswer,
      });

    res.status(201).json({
      success: true,
      message: "Answer Saved",
      data: answer,
    });

  } catch (error) {
    console.error(
      "SAVE ANSWER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Answers
export const getStudentAnswers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const answers =
      await getAllStudentAnswers();

    res.json({
      success: true,
      data: answers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Answer By ID
export const getStudentAnswerDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const answer =
      await getStudentAnswerById(
        req.params.id as string
      );

    if (!answer) {
      res.status(404).json({
        success: false,
        message: "Answer Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Answers By Attempt
export const getAttemptAnswers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const answers =
      await getAnswersByAttempt(
        req.params.attemptId as string
      );

    res.json({
      success: true,
      data: answers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Delete Answer
export const removeStudentAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteStudentAnswer(
      req.params.id as string
    );

    res.json({
      success: true,
      message: "Answer Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};