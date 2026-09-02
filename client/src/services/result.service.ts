import api from "./api";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================================================
// GET RESULT BY ATTEMPT
// =====================================================

export const getResultByAttempt = async (
  attemptId: string,
) => {
  const response = await api.get(
    `/results/attempt/${attemptId}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET STUDENT RESULTS
// =====================================================

export const getStudentResults = async (
  studentId: string,
) => {
  const response = await api.get(
    `/results/student/${studentId}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET LEADERBOARD
// =====================================================

export const getLeaderboard = async (
  examId?: string,
) => {
  const url = examId
    ? `/results/leaderboard?examId=${examId}`
    : "/results/leaderboard";

  const response = await api.get(
    url,
    getToken(),
  );

  return response.data;
};