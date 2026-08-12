import QuestionPaper, {
  IQuestionPaper,
} from "../models/questionPaper.model";



export const createQuestionPaper = async (
  data: Partial<IQuestionPaper>
) => {
  return await QuestionPaper.create(data);
};

export const getAllQuestionPapers = async () => {
  return await QuestionPaper.find().populate("uploadedBy", "username");
};

export const getQuestionPaperById = async (id: string) => {
  return await QuestionPaper.findById(id).populate(
    "uploadedBy",
    "username"
  );
};

export const updateQuestionPaper = async (
  id: string,
  data: Partial<IQuestionPaper>
) => {
   console.log("SERVICE DATA:", data);
  return await QuestionPaper.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteQuestionPaper = async (id: string) => {
  return await QuestionPaper.findByIdAndDelete(id);
};

