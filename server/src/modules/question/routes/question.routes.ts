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
import { authorize } from "../../../middleware/role.middleware";


const router = Router();

// Create Question
// router.post("/", authenticate, addQuestion);
router.post(
  "/",
  authenticate,
  authorize("Admin"),
  addQuestion
);


// Get All Questions
router.get("/", authenticate, getQuestions);

// Get Question By ID
router.get("/:id", authenticate, getQuestion);

// Get Questions By Exam
router.get("/exam/:examId", authenticate, getExamQuestions);

// Update Question
// router.put("/:id", authenticate, editQuestion);
router.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  editQuestion
);



// Delete Question
// router.delete("/:id", authenticate, removeQuestion);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeQuestion
);




export default router;