import api from "./api";

// Get imported question paper for review
export const getQuestionPaperImportForReview = async (
  id: string,
) => {
  const response = await api.get(
    `/question-papers/imports/${id}`,
  );

  console.log(
    "QUESTION PAPER IMPORT REVIEW RESPONSE:",
    response.data,
  );

  return response.data;
};

// Approve imported question paper
export const approveQuestionPaperImport = async (
  id: string,
) => {
  const response = await api.post(
    `/question-papers/imports/${id}/approve`,
  );

  console.log(
    "APPROVE QUESTION PAPER IMPORT RESPONSE:",
    response.data,
  );

  return response.data;
};