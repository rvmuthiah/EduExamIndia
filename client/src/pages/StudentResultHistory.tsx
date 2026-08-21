import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import {getStudentResults} from "../services/result.service";

interface StudentResultHistoryItem {
  _id: string;
  attemptId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: "PASS" | "FAIL";
  createdAt: string;
  examId?: {
    _id: string;
    title: string;
  };
}

const StudentResultHistory = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState<StudentResultHistoryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      try {
        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
          setError("Student ID not found.");
          return;
        }

        console.log("LOADING STUDENT RESULT HISTORY:", studentId);

        const response = await getStudentResults(studentId);

        console.log("STUDENT RESULT HISTORY RESPONSE:", response);

        if (!response.success) {
          setError(response.message || "Unable to load results.");
          return;
        }

        setResults(response.data || []);
      } catch (error: unknown) {
        console.error("GET STUDENT RESULT HISTORY ERROR:", error);

        setError("Unable to load student results.");
      } finally {
        setLoading(false);
      }
    };

    void loadResults();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{p: 3}}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              color="error">
              Unable to Load Results
            </Typography>

            <Typography sx={{mt: 1}}>{error}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{p: 3}}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}>
        My Results
      </Typography>

      {results.length === 0 ? (
        <Card>
          <CardContent>
            <Typography>No examination results found.</Typography>
          </CardContent>
        </Card>
      ) : (
        results.map(result => (
          <Card
            key={result._id}
            sx={{mb: 2}}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{fontWeight: 600}}>
                {result.examId?.title || "Examination"}
              </Typography>

              <Divider sx={{my: 2}} />

              <Typography>
                Score:{" "}
                <strong>
                  {result.score} / {result.totalMarks}
                </strong>
              </Typography>

              <Typography>
                Percentage:{" "}
                <strong>{Number(result.percentage).toFixed(2)}%</strong>
              </Typography>

              <Typography>Correct Answers: {result.correctAnswers}</Typography>

              <Typography>Wrong Answers: {result.wrongAnswers}</Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  color:
                    result.status === "PASS" ? "success.main" : "error.main",
                }}>
                {result.status}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{mt: 1}}>
                {new Date(result.createdAt).toLocaleDateString()}
              </Typography>

              <Button
                variant="contained"
                sx={{mt: 2}}
                onClick={() =>
                  navigate(`/student/results/${result.attemptId}`)
                }>
                View Result
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default StudentResultHistory;
