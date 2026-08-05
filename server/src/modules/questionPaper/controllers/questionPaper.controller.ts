import { Request, Response } from "express";
import {
  createQuestionPaper,
  getAllQuestionPapers,
  getQuestionPaperById,
  updateQuestionPaper,
  deleteQuestionPaper,
} from "../services/questionPaper.service";
import { AuthRequest } from "../../../middleware/auth.middleware";

export const uploadQuestionPaper = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
      return;
    }

    const questionPaper = await createQuestionPaper({
      title: req.body.title,
      board: req.body.board,
      standard: Number(req.body.standard),
      subject: req.body.subject,
      chapter: req.body.chapter,
      examType: req.body.examType,

      // Save uploaded PDF filename
      pdfFile: req.file.filename,

      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Question Paper uploaded successfully",
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
export const editQuestionPaper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
console.log("=========== UPDATE ===========");
console.log("ID:", req.params.id);
console.log("BODY:", req.body);

    const paper = await updateQuestionPaper(
      req.params.id as string,
      req.body
    );

    if (!paper) {
      res.status(404).json({
        success: false,
        message: "Question Paper not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Question Paper Updated",
      data: paper,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};