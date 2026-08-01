import QuestionPaper, {
  IQuestionPaper,
} from "../models/questionPaper.model";

export const createQuestionPaper = async (
  data: Partial<IQuestionPaper>
) => {
  return await QuestionPaper.create(data);
};

export const getAllQuestionPapers = async () => {
  return await QuestionPaper.find().sort({ createdAt: -1 });
};

export const getQuestionPaperById = async (id: string) => {
  return await QuestionPaper.findById(id);
};

export const deleteQuestionPaper = async (id: string) => {
  return await QuestionPaper.findByIdAndDelete(id);
};