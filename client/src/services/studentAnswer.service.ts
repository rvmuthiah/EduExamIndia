import axios from "axios";

const API_URL = "http://localhost:5000/api/student-answers";

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

export const saveStudentAnswer = async (
  data: SaveAnswerData,
) => {
  const response = await axios.post(
    API_URL,
    data,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

export const getAnswersByAttempt = async (
  attemptId: string,
) => {
  const response = await axios.get(
    `${API_URL}/attempt/${attemptId}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};