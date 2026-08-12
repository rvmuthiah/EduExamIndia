import {Request, Response} from "express";
import mongoose from "mongoose";

import QuestionPaperImport from "../models/questionPaperImport.model";
import Question from "../../question/models/question.model";

// =====================================================
// GET IMPORT FOR REVIEW
// =====================================================

export const getQuestionPaperImportForReview = async (
  req: Request,
  res: Response,
) => {
  try {
    const {id} = req.params;

    const questionPaperImport =
      await QuestionPaperImport.findById(id);

    if (!questionPaperImport) {
      return res.status(404).json({
        success: false,
        message: "Question paper import not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: questionPaperImport,
    });
  } catch (error) {
    console.error(
      "GET QUESTION PAPER IMPORT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load question paper import",
    });
  }
};


// =====================================================
// APPROVE IMPORT
// =====================================================

export const approveQuestionPaperImport = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    console.log("========== APPROVE IMPORT ==========");
    console.log("IMPORT ID:", id);

    // 1. Find import
    const questionPaperImport =
      await QuestionPaperImport.findById(id);

    console.log(
      "IMPORT FOUND:",
      !!questionPaperImport,
    );

    if (!questionPaperImport) {
      return res.status(404).json({
        success: false,
        message: "Question paper import not found",
      });
    }

    console.log(
      "IMPORT STATUS:",
      questionPaperImport.status,
    );

    console.log(
      "QUESTION PAPER ID:",
      questionPaperImport.questionPaperId,
    );

    // 2. Check status
    if (questionPaperImport.status === "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Question paper import is already approved",
      });
    }

    if (questionPaperImport.status !== "Review") {
      return res.status(400).json({
        success: false,
        message:
          "Only question papers in Review status can be approved",
      });
    }

    // 3. Check Question Paper link
    if (!questionPaperImport.questionPaperId) {
      console.log(
        "❌ NO QUESTION PAPER LINK",
      );

      return res.status(400).json({
        success: false,
        message:
          "Question paper is not linked to this import",
      });
    }

    // 4. Find original Question Paper
    const questionPaper =
      await mongoose
        .model("QuestionPaper")
        .findById(
          questionPaperImport.questionPaperId,
        );

    console.log(
      "QUESTION PAPER FOUND:",
      !!questionPaper,
    );

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message:
          "Linked question paper not found",
      });
    }

    console.log(
      "QUESTION PAPER:",
      questionPaper,
    );

    // 5. Imported questions
    console.log(
      "IMPORTED QUESTIONS:",
      questionPaperImport.questions.length,
    );

    // 6. Prepare Question Bank entries
    const questionsToCreate =
      questionPaperImport.questions.map(
        (importedQuestion) => ({
          questionPaperId:
            questionPaper._id,

          board:
            questionPaper.board,

          standard:
            questionPaper.standard,

          subject:
            questionPaper.subject,

          chapter:
            questionPaper.chapter || "",

          question:
            importedQuestion.question,

          optionA:
            importedQuestion.optionA,

          optionB:
            importedQuestion.optionB,

          optionC:
            importedQuestion.optionC,

          optionD:
            importedQuestion.optionD,

          correctAnswer:
            importedQuestion.correctAnswer,

          marks: 1,

          negativeMarks: 0,

          difficulty: "Easy",

          explanation:
            importedQuestion.explanation,

          status: "Active",
        }),
      );

    console.log(
      "QUESTIONS TO CREATE:",
      questionsToCreate.length,
    );

    // 7. Create Question Bank entries
    const createdQuestions =
      await Question.insertMany(
        questionsToCreate,
      );

    console.log(
      "QUESTIONS CREATED:",
      createdQuestions.length,
    );

    // 8. Approve import
    questionPaperImport.status =
      "Approved";

    await questionPaperImport.save();

    console.log(
      "IMPORT STATUS UPDATED: Approved",
    );

    // 9. Approve original paper
    questionPaper.status =
      "Approved";

    await questionPaper.save();

    console.log(
      "QUESTION PAPER STATUS UPDATED: Approved",
    );

    console.log(
      "========== APPROVAL SUCCESS ==========",
    );

    return res.status(200).json({
      success: true,
      message:
        "Question paper approved successfully",
      data: {
        importId:
          questionPaperImport._id,

        questionPaperId:
          questionPaper._id,

        totalQuestions:
          createdQuestions.length,

        status:
          questionPaperImport.status,
      },
    });
  } catch (error) {
    console.error(
      "========== APPROVAL ERROR ==========",
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to approve question paper",
    });
  }
};