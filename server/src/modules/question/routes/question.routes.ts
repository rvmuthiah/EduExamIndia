import { Router } from "express";
import {
  addQuestion,
  getQuestions,
  getQuestion,
  getExamQuestions,
  editQuestion,
  removeQuestion,
} from "../controllers/question.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Create Question
router.post("/", authenticate, addQuestion);

// Get All Questions
router.get("/", authenticate, getQuestions);

// Get Question By ID
router.get("/:id", authenticate, getQuestion);

// Get Questions By Exam
router.get("/exam/:examId", authenticate, getExamQuestions);

// Update Question
router.put("/:id", authenticate, editQuestion);

// Delete Question
router.delete("/:id", authenticate, removeQuestion);

export default router;