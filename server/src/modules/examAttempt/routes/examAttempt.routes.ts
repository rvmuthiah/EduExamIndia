import { Router } from "express";

import {
  startExam,
  getExamAttempts,
  getExamAttempt,
  getStudentAttempts,
  submitExam,
  removeExamAttempt,
} from "../controllers/examAttempt.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Start Exam
router.post("/start", authenticate, startExam);

// Get All Attempts
router.get("/", authenticate, getExamAttempts);

// Student Attempts
router.get(
  "/student/:studentId",
  authenticate,
  getStudentAttempts
);

// Get Attempt By Id
router.get("/:id", authenticate, getExamAttempt);

// Submit Exam
router.put("/:id/submit", authenticate, submitExam);

// Delete
router.delete("/:id", authenticate, removeExamAttempt);





export default router;