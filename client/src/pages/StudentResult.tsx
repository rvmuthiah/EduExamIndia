import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import {getResultByAttempt} from "../services/result.service";

interface ResultData {
  _id: string;
  attemptId: string;
  studentId: string;
  examId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: "PASS" | "FAIL";
}

const StudentResult = () => {
  const {attemptId} = useParams<{attemptId: string}>();
  const navigate = useNavigate();

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResult = async () => {
      if (!attemptId) {
        setError("Attempt ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getResultByAttempt(attemptId);

        console.log("STUDENT RESULT RESPONSE:", response);

        if (!response.success || !response.data) {
          setError(response.message || "Result not found.");
          return;
        }

        setResult(response.data);
      } catch (error: unknown) {
        console.error("GET RESULT ERROR:", error);

        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          setError(
            axiosError.response?.data?.message || "Unable to load result.",
          );
        } else {
          setError("Unable to load result.");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadResult();
  }, [attemptId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
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
              color="error"
              gutterBottom>
              Unable to Load Result
            </Typography>

            <Typography sx={{mb: 3}}>{error}</Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/student/exams")}>
              Back to Exams
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Box sx={{p: 3}}>
      <Card
        sx={{
          maxWidth: 800,
          mx: "auto",
        }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom>
            Exam Result
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{mb: 3}}>
            Your examination has been evaluated successfully.
          </Typography>

          <Divider sx={{mb: 3}} />

          <Grid
            container
            spacing={3}>
            <Grid size={{xs: 12, sm: 6}}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="text.secondary">Score</Typography>

                  <Typography variant="h4">
                    {result.score} / {result.totalMarks}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="text.secondary">Percentage</Typography>

                  <Typography variant="h4">
                    {Number(result.percentage).toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="text.secondary">
                    Correct Answers
                  </Typography>

                  <Typography variant="h5">{result.correctAnswers}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="text.secondary">Wrong Answers</Typography>

                  <Typography variant="h5">{result.wrongAnswers}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              mb: 3,
            }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: result.status === "PASS" ? "success.main" : "error.main",
              }}>
              {result.status}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}>
            <Button
              variant="contained"
              onClick={() => navigate("/student/exams")}>
              Back to Exams
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentResult;
