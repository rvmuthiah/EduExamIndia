import {Request, Response} from "express";

import {extractPdfText} from "../services/pdfExtraction.service";
import {parseMcqText} from "../services/mcqParser.service";
import {addExplanations} from "../services/explanation.service";
import {createQuestionPaperImport} from "../services/questionPaperImport.service";

export const parseMcqPdf = async (
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

    console.log(
      "PARSING PDF:",
      req.file.originalname,
    );

    // Step 1: Extract text
    const text = await extractPdfText(
      req.file.path,
    );

    console.log(
      "PDF TEXT LENGTH:",
      text.length,
    );

    // Step 2: Parse MCQs
    const parsedQuestions = parseMcqText(text);

    // Step 3: Add explanations
    const questions = addExplanations(
      parsedQuestions,
    );

    console.log(
      "PARSED QUESTIONS:",
      questions.length,
    );

    // Step 4: Save parsed questions for Admin Review
    const { questionPaperId } = req.body;

console.log(
  "QUESTION PAPER ID RECEIVED:",
  questionPaperId,
);

const questionPaperImport =
  await createQuestionPaperImport({
    questionPaperId,
    fileName: req.file.originalname,
    filePath: req.file.path,
    questions,
  });

    console.log(
      "QUESTION PAPER IMPORT CREATED:",
      questionPaperImport._id,
    );

    // Step 5: Return response
    return res.status(200).json({
      success: true,
      message: "PDF converted to MCQs and saved for review",
      data: {
        importId: questionPaperImport._id,
        fileName: req.file.originalname,
        totalQuestions: questions.length,
        status: questionPaperImport.status,
        questions,
      },
    });
  } catch (error) {
    console.error(
      "MCQ PARSER ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to convert PDF to MCQs",
    });
  }
};