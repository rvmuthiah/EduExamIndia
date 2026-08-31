import { Router } from "express";

import {
  getResults,
  getResult,
  getAttemptResult,
  getResultsByStudent,
  removeResult,
  leaderboard,
} from "../controllers/result.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Get All Results
router.get("/", authenticate, getResults);

// Get leaderboard
router.get(
  "/leaderboard",
  authenticate,
  leaderboard
);

// Get Result By ID
router.get("/:id", authenticate, getResult);

// Get Result By Attempt
router.get(
  "/attempt/:attemptId",
  authenticate,
  getAttemptResult
);

// Get Student Results
router.get(
  "/student/:studentId",
  authenticate,
  getResultsByStudent
);

// Delete Result
router.delete("/:id", authenticate, removeResult);

export default router;