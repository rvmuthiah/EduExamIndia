import { Router } from "express";
import {
  addExam,
  getExams,
  getExam,
  editExam,
  publishExam,
  closeExam,
  removeExam,
} from "../controllers/exam.controller";
import { authenticate } from "../../../middleware/auth.middleware";
import { authorize } from "../../../middleware/role.middleware";



const router = Router();

// Create Exam
// router.post("/", authenticate, addExam);
router.post(
  "/",
  authenticate,
  authorize("Admin"),
  addExam
);

// Get All Exams
router.get("/", authenticate, getExams);

// Get Exam By ID
router.get("/:id", authenticate, getExam);

// Update Exam
// router.put("/:id", authenticate, editExam);
router.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  editExam
);

// Publish Exam
router.put(
  "/:id/publish",
  authenticate,
  authorize("Admin"),
  publishExam
);

// Close Exam
router.put(
  "/:id/close",
  authenticate,
  authorize("Admin"),
  closeExam
);

// Delete Exam
// router.delete("/:id", authenticate, removeExam);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeExam
);



export default router;