import { Request, Response } from "express";

import {
  getExamLeaderboard,
  getOverallLeaderboard,
} from "../services/leaderboard.service";

// Overall Leaderboard
export const overallLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaderboard =
      await getOverallLeaderboard();

    res.json({
      success: true,
      data: leaderboard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Exam Leaderboard
export const examLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const examId = Array.isArray(req.params.examId)
      ? req.params.examId[0]
      : req.params.examId;

    const leaderboard =
      await getExamLeaderboard(examId);

    res.json({
      success: true,
      data: leaderboard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};