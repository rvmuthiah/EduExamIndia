import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

// =====================================================
// STUDENT DATA TYPE
// =====================================================

export interface StudentData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  board: string;
  standard: string | number;
  school: string;
  parentName: string;
  parentMobile: string;
  subscriptionType?: string;
  status?: string;
}

// =====================================================
// CREATE / REGISTER STUDENT
// =====================================================

export const createStudent = async (
  studentData: StudentData
) => {
  const response = await axios.post(
    `${API_URL}/register`,
    {
      ...studentData,
      standard: Number(studentData.standard),
    }
  );

  return response.data;
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getStudents = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

export const getStudentById = async (
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};

// =====================================================
// GET STUDENT
// Used by EditStudent.tsx
// =====================================================

export const getStudent = async (
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};

// =====================================================
// UPDATE STUDENT
// =====================================================

export const updateStudent = async (
  id: string,
  studentData: Record<string, unknown>
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    studentData
  );

  return response.data;
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const deleteStudent = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};