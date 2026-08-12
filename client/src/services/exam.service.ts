import api from "./api";

// ============================================
// GET ALL EXAMS
// ============================================

export const getExams = async () => {
  const response = await api.get("/exams");

  return response.data;
};

// ============================================
// GET SINGLE EXAM
// ============================================

export const getExam = async (
  id: string,
) => {
  const response = await api.get(
    `/exams/${id}`,
  );

  return response.data;
};

// ============================================
// CREATE EXAM
// ============================================

export const createExam = async (
  data: object,
) => {
  const response = await api.post(
    "/exams",
    data,
  );

  return response.data;
};

// ============================================
// UPDATE EXAM
// ============================================

export const updateExam = async (
  id: string,
  data: object,
) => {
  const response = await api.put(
    `/exams/${id}`,
    data,
  );

  return response.data;
};

// ============================================
// PUBLISH EXAM
// ============================================

export const publishExam = async (
  id: string,
) => {
  const response = await api.put(
    `/exams/${id}/publish`,
    {},
  );

  return response.data;
};

// ============================================
// CLOSE EXAM
// ============================================

export const closeExam = async (
  id: string,
) => {
  const response = await api.put(
    `/exams/${id}/close`,
    {},
  );

  return response.data;
};

// ============================================
// DELETE EXAM
// ============================================

export const deleteExam = async (
  id: string,
) => {
  const response = await api.delete(
    `/exams/${id}`,
  );

  return response.data;
};