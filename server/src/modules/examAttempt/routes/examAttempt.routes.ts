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
import { authorize } from "../../../middleware/role.middleware";


const router = Router();

// Start Exam
// router.post("/start", authenticate, startExam);
router.post(
  "/start",
  authenticate,
  authorize("Student"),
  startExam
);


// Get All Attempts
// router.get("/", authenticate, getExamAttempts);
router.get(
  "/",
  authenticate,
  authorize("Admin"),
  getExamAttempts
);


// Student Attempts
// router.get(
//   "/student/:studentId",
//   authenticate,
//   getStudentAttempts
// );
router.get(
  "/student/:studentId",
  authenticate,
  authorize("Student"),
  getStudentAttempts
);


// Get Attempt By Id
// router.get("/:id", authenticate, getExamAttempt);
router.get(
  "/:id",
  authenticate,
  authorize("Student"),
  getExamAttempt
);



// Submit Exam
// router.put("/:id/submit", authenticate, submitExam);
router.put(
  "/:id/submit",
  authenticate,
  authorize("Student"),
  submitExam
);

// Delete
// router.delete("/:id", authenticate, removeExamAttempt);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeExamAttempt
);


export default router;