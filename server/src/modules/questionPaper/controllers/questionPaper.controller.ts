import { Request, Response } from "express";
import {
  createQuestionPaper,
  getAllQuestionPapers,
  getQuestionPaperById,
  deleteQuestionPaper,
} from "../services/questionPaper.service";
import { AuthRequest } from "../../../middleware/auth.middleware";

export const uploadQuestionPaper = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const questionPaper = await createQuestionPaper({
      ...req.body,
      uploadedBy: req.admin.id,
    });

    res.status(201).json({
      success: true,
      message: "Question Paper created successfully",
      data: questionPaper,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getQuestionPapers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const papers = await getAllQuestionPapers();

    res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getQuestionPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

const paper = await getQuestionPaperById(id);

    res.status(200).json({
      success: true,
      data: paper,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const removeQuestionPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

await deleteQuestionPaper(id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};