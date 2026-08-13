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
import {
  createResult,
  getResultByAttempt,
} from "../../result/services/result.service";
import {
  getPublishedExamById,
  validateExamTime,
} from "../../exam/services/exam.service";



// Start Exam
// Start Exam
export const startExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { studentId, examId } = req.body;

    // Check Exam
    const exam = await getPublishedExamById(examId);

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found or Not Published",
      });
      return;
    }

    // Validate Time
    try {
      validateExamTime(exam);
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
      return;
    }

    // Check Existing Attempt
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

    // Create Attempt
    const startedAt = new Date();

const endsAt = new Date(
  startedAt.getTime() +
    (exam.durationMinutes ?? 0) * 60 * 1000
);

const attempt = await createExamAttempt({
  studentId,
  examId,
  startedAt,
  endsAt,
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
// Submit Exam
export const submitExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const attemptId = Array.isArray(req.params.id)
    //   ? req.params.id[0]
    //   : req.params.id;

    // // Evaluate Exam
    // const result = await evaluateExam(attemptId);

    const attemptId = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

// Get Attempt
const attempt = await getExamAttemptById(attemptId);

if (!attempt) {
  res.status(404).json({
    success: false,
    message: "Exam Attempt Not Found",
  });
  return;
}

// Already Submitted
if (attempt.status === "Completed") {
  res.status(400).json({
    success: false,
    message: "Exam Already Submitted",
  });
  return;
}

// Evaluate Exam
const result = await evaluateExam(attemptId);




    // Update Exam Attempt
    const updatedAttempt = await updateExamAttempt(
      attemptId,
      {
        score: result.score,
        totalMarks: result.totalMarks,
        status: "Completed",
        submittedAt: new Date(),
      }
    );

    if (!updatedAttempt) {
      res.status(404).json({
        success: false,
        message: "Exam Attempt Not Found",
      });
      return;
    }

    // Calculate Percentage
    const percentage =
      updatedAttempt.totalMarks > 0
        ? (updatedAttempt.score / updatedAttempt.totalMarks) * 100
        : 0;

    // Check if Result already exists
    // const { getResultByAttempt } = await import(
    //   "../../result/services/result.service"
    // );

    const existingResult = await getResultByAttempt(
      attemptId
    );

    if (!existingResult) {
      await createResult({
        attemptId:
          updatedAttempt._id as import("mongoose").Types.ObjectId,
        studentId:
          updatedAttempt.studentId as any,
        examId:
          updatedAttempt.examId as any,
        score: updatedAttempt.score,
        totalMarks: updatedAttempt.totalMarks,
        percentage,
        correctAnswers: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        status:
          percentage >= 35
            ? "PASS"
            : "FAIL",
      });
    }

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

 