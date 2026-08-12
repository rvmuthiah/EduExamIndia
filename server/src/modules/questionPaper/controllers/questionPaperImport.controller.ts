import {Request, Response} from "express";

import {
  createQuestionPaperImport,
  getQuestionPaperImportById,
  getQuestionPaperImports,
  updateQuestionPaperImport,
  deleteQuestionPaperImport,
} from "../services/questionPaperImport.service";

// Create import
export const createImport = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      questionPaperId,
      fileName,
      filePath,
      questions,
    } = req.body;

    if (!fileName || !filePath || !questions) {
      return res.status(400).json({
        success: false,
        message:
          "fileName, filePath and questions are required",
      });
    }

    const questionPaperImport =
      await createQuestionPaperImport({
        questionPaperId,
        fileName,
        filePath,
        questions,
      });

    return res.status(201).json({
      success: true,
      message:
        "Question paper import created successfully",
      data: questionPaperImport,
    });
  } catch (error) {
    console.error(
      "CREATE IMPORT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create question paper import",
    });
  }
};

// Get all imports
export const getAllImports = async (
  _req: Request,
  res: Response,
) => {
  try {
    const imports =
      await getQuestionPaperImports();

    return res.status(200).json({
      success: true,
      data: imports,
    });
  } catch (error) {
    console.error(
      "GET IMPORTS ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to get question paper imports",
    });
  }
};

// Get one import
export const getImportById = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const questionPaperImport =
      await getQuestionPaperImportById(id);

    if (!questionPaperImport) {
      return res.status(404).json({
        success: false,
        message:
          "Question paper import not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: questionPaperImport,
    });
  } catch (error) {
    console.error(
      "GET IMPORT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to get question paper import",
    });
  }
};

// Update import
export const updateImport = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const updatedImport =
      await updateQuestionPaperImport(
        id,
        req.body,
      );

    if (!updatedImport) {
      return res.status(404).json({
        success: false,
        message:
          "Question paper import not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Question paper import updated successfully",
      data: updatedImport,
    });
  } catch (error) {
    console.error(
      "UPDATE IMPORT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update question paper import",
    });
  }
};

// Delete import
export const deleteImport = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const deletedImport =
      await deleteQuestionPaperImport(id);

    if (!deletedImport) {
      return res.status(404).json({
        success: false,
        message:
          "Question paper import not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Question paper import deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE IMPORT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete question paper import",
    });
  }
};