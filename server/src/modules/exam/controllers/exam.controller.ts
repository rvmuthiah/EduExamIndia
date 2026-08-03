import { Request, Response } from "express";
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../services/exam.service";

// Create Exam
export const addExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const exam = await createExam(req.body);

    res.status(201).json({
      success: true,
      message: "Exam Created Successfully",
      data: exam,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Exams
export const getExams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const exams = await getAllExams();

    res.json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Exam By ID
export const getExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await getExamById(id);

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Exam
export const editExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const exam = await updateExam(id, req.body);

    if (!exam) {
      res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Exam Updated Successfully",
      data: exam,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Exam
export const removeExam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteExam(id);

    res.json({
      success: true,
      message: "Exam Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};