import { Request, Response } from "express";

export const uploadPDF = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "PDF Uploaded Successfully",
      data: {
        filename: req.file.filename,
        path: `uploads/question-papers/${req.file.filename}`,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });
  }
};