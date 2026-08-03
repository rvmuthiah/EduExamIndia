import { Router } from "express";
import {
  uploadQuestionPaper,
  getQuestionPapers,
  getQuestionPaper,
  editQuestionPaper,
  removeQuestionPaper,
} from "../controllers/questionPaper.controller";
import { authorize } from "../../../middleware/role.middleware";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// router.post("/", authenticate, uploadQuestionPaper);

router.post(
    "/upload",
    authenticate,
    authorize("Admin"),
    uploadQuestionPaper
);

router.get("/", authenticate, getQuestionPapers);

router.get("/:id", authenticate, getQuestionPaper);

// router.put("/:id", authenticate, editQuestionPaper);
router.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  editQuestionPaper
);

// router.delete("/:id", authenticate, removeQuestionPaper);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeQuestionPaper
);

export default router;