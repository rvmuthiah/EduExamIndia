import api from "./api";

interface SaveAnswerData {
  attemptId: string;
  questionId: string;
  selectedAnswer: "A" | "B" | "C" | "D";
}

const getAuthToken = (): string => {
  return (
    localStorage.getItem("studentToken") ||
    localStorage.getItem("token") ||
    ""
  );
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

// =====================================================
// SAVE STUDENT ANSWER
// =====================================================

export const saveStudentAnswer = async (
  data: SaveAnswerData,
) => {
  const response = await api.post(
    "/student-answers",
    data,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

// =====================================================
// GET ANSWERS BY ATTEMPT
// =====================================================

export const getAnswersByAttempt = async (
  attemptId: string,
) => {
  const response = await api.get(
    `/student-answers/attempt/${attemptId}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};