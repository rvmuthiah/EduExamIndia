import axios from "axios";

const API_URL =
  "http://localhost:5000/api/results";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================================================
// GET RESULT BY ATTEMPT
// =====================================================

export const getResultByAttempt = async (
  attemptId: string
) => {
  const response = await axios.get(
    `${API_URL}/attempt/${attemptId}`,
    getToken()
  );

  return response.data;
};

// =====================================================
// GET STUDENT RESULTS
// =====================================================

export const getStudentResults = async (
  studentId: string
) => {
  const response = await axios.get(
    `${API_URL}/student/${studentId}`,
    getToken()
  );

  return response.data;
};

// =====================================================
// GET LEADERBOARD
// =====================================================

export const getLeaderboard = async (
  examId?: string
) => {
  const url = examId
    ? `${API_URL}/leaderboard?examId=${examId}`
    : `${API_URL}/leaderboard`;

  const response = await axios.get(
    url,
    getToken()
  );

  return response.data;
};