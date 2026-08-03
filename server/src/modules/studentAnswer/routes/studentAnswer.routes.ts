import { Router } from "express";

import {
  saveAnswer,
  getStudentAnswers,
  getStudentAnswerDetails,
  getAttemptAnswers,
  removeStudentAnswer,
} from "../controllers/studentAnswer.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Save / Update Answer
router.post("/", authenticate, saveAnswer);

// Get All Answers
router.get("/", authenticate, getStudentAnswers);

// Get Answers By Attempt
router.get(
  "/attempt/:attemptId",
  authenticate,
  getAttemptAnswers
);

// Get Answer By ID
router.get("/:id", authenticate, getStudentAnswerDetails);

// Delete Answer
router.delete("/:id", authenticate, removeStudentAnswer);

export default router;