import axios from "axios";

const API_URL =
  "http://localhost:5000/api/exam-attempts";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =====================================================
// START EXAM
// =====================================================

export const startExamAttempt = async (
  studentId: string,
  examId: string,
) => {
  const response = await axios.post(
    `${API_URL}/start`,
    {
      studentId,
      examId,
    },
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET ATTEMPT BY ID
// =====================================================

export const getExamAttempt = async (
  attemptId: string,
) => {
  const response = await axios.get(
    `${API_URL}/${attemptId}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET STUDENT ATTEMPTS
// =====================================================

export const getStudentAttempts = async (
  studentId: string,
) => {
  const response = await axios.get(
    `${API_URL}/student/${studentId}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// SUBMIT EXAM
// =====================================================

export const submitExam = async (
  attemptId: string,
) => {
  const response = await axios.post(
    `${API_URL}/${attemptId}/submit`,
    {},
    getToken(),
  );

  return response.data;
};