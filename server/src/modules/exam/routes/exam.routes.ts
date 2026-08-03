import { Router } from "express";
import {
  addExam,
  getExams,
  getExam,
  editExam,
  removeExam,
} from "../controllers/exam.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Create Exam
router.post("/", authenticate, addExam);

// Get All Exams
router.get("/", authenticate, getExams);

// Get Exam By ID
router.get("/:id", authenticate, getExam);

// Update Exam
router.put("/:id", authenticate, editExam);

// Delete Exam
router.delete("/:id", authenticate, removeExam);

export default router;