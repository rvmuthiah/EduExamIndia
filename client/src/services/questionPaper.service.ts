import api from "./api";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getQuestionPapers = async () => {
  const response = await api.get("/question-papers", getToken());

  console.log("QUESTION PAPER RESPONSE:", response.data);

  return response.data;
};

export const getQuestionPaper = async (id: string) => {
  const response = await api.get(
    `/question-papers/${id}`,
    getToken()
  );

  return response.data;
};

export const createQuestionPaper = async (data: FormData) => {
  const response = await api.post(
    "/question-papers/upload",
    data,
    {
      headers: {
        ...getToken().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateQuestionPaper = async (
  id: string,
  data: FormData
) => {
  const response = await api.put(
    `/question-papers/${id}`,
    data,
    {
      headers: {
        ...getToken().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteQuestionPaper = async (id: string) => {
  const response = await api.delete(
    `/question-papers/${id}`,
    getToken()
  );

  return response.data;
};