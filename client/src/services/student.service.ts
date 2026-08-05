import api from "./api";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getStudents = async () => {
  const response = await api.get("/students", getToken());
  return response.data;
};

export const getStudent = async (id: string) => {
  const response = await api.get(`/students/${id}`, getToken());
  return response.data;
};

export const createStudent = async (data: unknown) => {
  const response = await api.post("/students", data, getToken());
  return response.data;
};

export const updateStudent = async (
  id: string,
  data: unknown
) => {
  const response = await api.put(
    `/students/${id}`,
    data,
    getToken()
  );

  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await api.delete(
    `/students/${id}`,
    getToken()
  );

  return response.data;
};