import api from "./api";

export interface Question {
  _id: string;

  examId:
    | string
    | {
        _id: string;
        title: string;
      };

  board: string;
  standard: number;
  subject: string;
  chapter: string;

  question: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  correctAnswer: "A" | "B" | "C" | "D";

  marks: number;
  negativeMarks: number;

  difficulty: "Easy" | "Medium" | "Hard";

  explanation?: string;

  status: "Active" | "Inactive";

  createdAt?: string;
  updatedAt?: string;
};

/**
 * Get the correct token for the logged-in user.
 *
 * Admin login  -> token
 * Student login -> studentToken
 */
const getAuthToken = (): string => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("studentToken") ||
    ""
  );
};

/**
 * Common Authorization header.
 */
const getAuthHeaders = () => {
  const token = getAuthToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

// =====================================================
// GET ALL QUESTIONS
// =====================================================

export const getQuestions = async () => {
  const response = await api.get("/questions", {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// =====================================================
// GET QUESTIONS BY EXAM
// =====================================================

export const getQuestionsForExam = async (
  examId: string,
) => {
  const response = await api.get(
    `/questions/exam/${examId}`,
    {
      headers: getAuthHeaders(),
    },
  );

  console.log(
    "GET EXAM QUESTIONS RESPONSE:",
    response.data,
  );

  return response.data;
};

// =====================================================
// GET SINGLE QUESTION
// =====================================================

export const getQuestion = async (
  id: string,
) => {
  const response = await api.get(
    `/questions/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  console.log(
    "GET QUESTION RESPONSE:",
    response.data,
  );

  return response.data;
};

// =====================================================
// CREATE QUESTION
// =====================================================

export const createQuestion = async (
  data: Partial<Question>,
) => {
  const response = await api.post(
    "/questions",
    data,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

// =====================================================
// UPDATE QUESTION
// =====================================================

export const updateQuestion = async (
  id: string,
  data: Partial<Question>,
) => {
  const response = await api.put(
    `/questions/${id}`,
    data,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

// =====================================================
// DELETE QUESTION
// =====================================================

export const deleteQuestion = async (
  id: string,
) => {
  const response = await api.delete(
    `/questions/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};