import api from "./api";

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
  const response = await api.post(
    "/exam-attempts/start",
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
  const response = await api.get(
    `/exam-attempts/${attemptId}`,
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
  const response = await api.get(
    `/exam-attempts/student/${studentId}`,
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
  const response = await api.put(
    `/exam-attempts/${attemptId}/submit`,
    {},
    getToken(),
  );

  return response.data;
};