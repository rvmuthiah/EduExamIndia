import { Router } from "express";

import {
  overallLeaderboard,
  examLeaderboard,
} from "../controllers/leaderboard.controller";

import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

// Overall Leaderboard
router.get(
  "/",
  authenticate,
  overallLeaderboard
);

// Exam Leaderboard
router.get(
  "/exam/:examId",
  authenticate,
  examLeaderboard
);

export default router;