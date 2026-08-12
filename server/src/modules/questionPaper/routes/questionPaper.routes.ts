import { Router } from "express";
import {
  uploadQuestionPaper,
  getQuestionPapers,
  getQuestionPaper,
  editQuestionPaper,
  removeQuestionPaper,
} from "../controllers/questionPaper.controller";
import {
  getQuestionPaperImportForReview,
  approveQuestionPaperImport,
} from "../controllers/questionPaperReview.controller";
import {parseMcqPdf} from "../controllers/mcqParser.controller";
import { authorize } from "../../../middleware/role.middleware";
import { authenticate } from "../../../middleware/auth.middleware";
import upload from "../../../middleware/upload.middleware";


const router = Router();

// router.post("/", authenticate, uploadQuestionPaper);
// Upload original Question Paper PDF
router.post(
  "/upload",
  authenticate,
  authorize("Admin"),
  upload.single("pdf"),
  uploadQuestionPaper
);

// Parse PDF → MCQs → Explanations → Review
router.post(
  "/parse",
  authenticate,
  authorize("Admin"),
  upload.single("pdf"),
  parseMcqPdf,
);

router.get(
  "/imports/:id",
  authenticate,
  authorize("Admin"),
  getQuestionPaperImportForReview,
);


router.post(
  "/imports/:id/approve",
  authenticate,
  authorize("Admin"),
  approveQuestionPaperImport,
);


router.get("/", authenticate, getQuestionPapers);

router.get("/:id", authenticate, getQuestionPaper);

// router.put("/:id", authenticate, editQuestionPaper);
router.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  upload.single("pdf"),
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