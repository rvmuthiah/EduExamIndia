import {Request, Response} from "express";
import {extractPdfText} from "../services/pdfExtraction.service";

export const extractPdfController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const text = await extractPdfText(req.file.path);

    return res.status(200).json({
      success: true,
      message: "PDF text extracted successfully",
      data: {
        fileName: req.file.originalname,
        text,
      },
    });
  } catch (error) {
    console.error("PDF EXTRACTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to extract PDF text",
    });
  }
};