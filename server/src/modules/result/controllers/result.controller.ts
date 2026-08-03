import { Request, Response } from "express";

import {
  getAllResults,
  getResultById,
  getResultByAttempt,
  getStudentResults,
  deleteResult,
} from "../services/result.service";

// Get All Results
export const getResults = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await getAllResults();

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Result By ID
export const getResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result = await getResultById(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Result By Attempt
export const getAttemptResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attemptId = Array.isArray(req.params.attemptId)
      ? req.params.attemptId[0]
      : req.params.attemptId;

    const result = await getResultByAttempt(attemptId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Student Results
export const getResultsByStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = Array.isArray(req.params.studentId)
      ? req.params.studentId[0]
      : req.params.studentId;

    const results = await getStudentResults(studentId);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Result
export const removeResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteResult(id);

    res.json({
      success: true,
      message: "Result Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};