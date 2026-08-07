import { Router } from "express";

import {
  addQuestion,
  getQuestions,
  getQuestion,
  getQuestionsForExam,
  getQuestionsForQuestionPaper,
  editQuestion,
  removeQuestion,
} from "../controllers/question.controller";

import { authenticate } from "../../../middleware/auth.middleware";
import { authorize } from "../../../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  getQuestions
);

router.get(
  "/exam/:examId",
  authenticate,
  getQuestionsForExam
);

router.get(
  "/paper/:questionPaperId",
  authenticate,
  getQuestionsForQuestionPaper
);

router.get(
  "/:id",
  authenticate,
  getQuestion
);

router.post(
  "/",
  authenticate,
  authorize("Admin"),
  addQuestion
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  editQuestion
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeQuestion
);

export default router;