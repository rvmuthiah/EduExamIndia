import { Router } from "express";
import {
  uploadQuestionPaper,
  getQuestionPapers,
  getQuestionPaper,
  removeQuestionPaper,
} from "../controllers/questionPaper.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, uploadQuestionPaper);

router.get("/", authenticate, getQuestionPapers);

router.get("/:id", authenticate, getQuestionPaper);

router.delete("/:id", authenticate, removeQuestionPaper);

export default router;