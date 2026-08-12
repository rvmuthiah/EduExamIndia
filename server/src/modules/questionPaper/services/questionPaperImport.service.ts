import QuestionPaperImport from "../models/questionPaperImport.model";

interface CreateImportData {
  questionPaperId?: string;
  fileName: string;
  filePath: string;
  questions: {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: "A" | "B" | "C" | "D";
    explanation: string;
  }[];
}

export const createQuestionPaperImport = async (
  data: CreateImportData,
) => {
  const questionPaperImport =
    await QuestionPaperImport.create({
      questionPaperId: data.questionPaperId,
      fileName: data.fileName,
      filePath: data.filePath,
      questions: data.questions,
      status: "Review",
    });

  return questionPaperImport;
};

export const getQuestionPaperImportById = async (
  id: string,
) => {
  return await QuestionPaperImport.findById(id);
};

export const getQuestionPaperImports = async () => {
  return await QuestionPaperImport.find()
    .sort({createdAt: -1});
};

export const updateQuestionPaperImport = async (
  id: string,
  data: Partial<CreateImportData> & {
    status?: "Draft" | "Review" | "Approved" | "Rejected";
  },
) => {
  return await QuestionPaperImport.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteQuestionPaperImport = async (
  id: string,
) => {
  return await QuestionPaperImport.findByIdAndDelete(id);
};