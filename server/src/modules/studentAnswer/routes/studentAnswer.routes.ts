import { Router } from "express";

import {
  saveAnswer,
  getStudentAnswers,
  getStudentAnswerDetails,
  getAttemptAnswers,
  removeStudentAnswer,
} from "../controllers/studentAnswer.controller";

import { authenticate } from "../../../middleware/auth.middleware";
import { authorize } from "../../../middleware/role.middleware";


const router = Router();

// Save / Update Answer
// router.post("/", authenticate, saveAnswer);
router.post(
  "/",
  authenticate,
  authorize("Student"),
  saveAnswer
);


// Get All Answers
// router.get("/", authenticate, getStudentAnswers);
router.get(
  "/",
  authenticate,
  authorize("Admin"),
  getStudentAnswers
);



// Get Answers By Attempt
// router.get(
//   "/attempt/:attemptId",
//   authenticate,
//   getAttemptAnswers
// );
router.get(
  "/attempt/:attemptId",
  authenticate,
  authorize("Student"),
  getAttemptAnswers
);


// Get Answer By ID
// router.get("/:id", authenticate, getStudentAnswerDetails);
router.get(
  "/:id",
  authenticate,
  authorize("Student"),
  getStudentAnswerDetails
);



// Delete Answer
// router.delete("/:id", authenticate, removeStudentAnswer);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  removeStudentAnswer
);


export default router;