import api from "./api";

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
// GET TOKEN
// =====================================================

const getToken = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// =====================================================
// CREATE / REGISTER STUDENT
// =====================================================

export const createStudent = async (
  studentData: StudentData,
) => {
  const response = await api.post(
    "/students/register",
    {
      ...studentData,
      standard: Number(
        studentData.standard,
      ),
    },
  );

  return response.data;
};

// =====================================================
// STUDENT LOGIN
// =====================================================

export const studentLogin = async (
  username: string,
  password: string,
) => {
  const response = await api.post(
    "/students/login",
    {
      username,
      password,
    },
  );

  return response.data;
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getStudents = async () => {
  const response = await api.get(
    "/students",
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

export const getStudentById = async (
  id: string,
) => {
  const response = await api.get(
    `/students/${id}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// ALIAS
// =====================================================

// EditStudent previously used getStudent.
// Keep this alias so we don't break that page.

export const getStudent =
  getStudentById;

// =====================================================
// UPDATE STUDENT
// =====================================================

export const updateStudent = async (
  id: string,
  studentData: Record<string, unknown>,
) => {
  const response = await api.put(
    `/students/${id}`,
    studentData,
    getToken(),
  );

  return response.data;
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const deleteStudent = async (
  id: string,
) => {
  const response = await api.delete(
    `/students/${id}`,
    getToken(),
  );

  return response.data;
};

// =====================================================
// GET STUDENT LEADERBOARD
// =====================================================

export const getStudentLeaderboard =
  async () => {
    const response =
      await api.get(
        "/students/leaderboard",
        getToken(),
      );

    return response.data;
  };