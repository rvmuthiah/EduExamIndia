import {useEffect, useState} from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import {getStudentLeaderboard} from "../services/student.service";

interface Student {
  _id: string;
  name: string;
  email: string;
  board: string;
  standard: number;
}

interface Exam {
  _id: string;
  title: string;
}

interface LeaderboardItem {
  rank: number;
  studentId: Student;
  examId: Exam;
  score: number;
  totalMarks: number;
  percentage: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: "PASS" | "FAIL";
}

const StudentLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===================================================
  // LOAD LEADERBOARD
  // ===================================================

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getStudentLeaderboard();

        if (response.success) {
          setLeaderboard(response.data || []);
        } else {
          setError(response.message || "Unable to load leaderboard");
        }
      } catch (err) {
        console.error("LEADERBOARD ERROR:", err);

        setError("Unable to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    void loadLeaderboard();
  }, []);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{mt: 4}}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <Container
      maxWidth="lg"
      sx={{py: 4}}>
      {/* =============================================
          HEADER
      ============================================= */}

      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}>
        <EmojiEventsIcon
          sx={{
            fontSize: 55,
            mb: 1,
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
          }}>
          Student Leaderboard
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mt: 1,
          }}>
          See the top performers based on their best exam results.
        </Typography>
      </Box>

      {/* =============================================
          EMPTY
      ============================================= */}

      {leaderboard.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
          }}>
          <Typography variant="h6">No results available yet.</Typography>
        </Paper>
      ) : (
        <Paper
          elevation={2}
          sx={{
            overflow: "hidden",
            borderRadius: 3,
          }}>
          {/* =========================================
              TABLE HEADER
          ========================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "grid",
              },

              gridTemplateColumns: "70px 2fr 1fr 1.5fr 120px 120px 100px",

              gap: 2,

              p: 2,

              backgroundColor: "#f1f5f9",

              fontWeight: 700,
            }}>
            <Box>Rank</Box>
            <Box>Student</Box>
            <Box>Standard</Box>
            <Box>Exam</Box>
            <Box>Score</Box>
            <Box>Percentage</Box>
            <Box>Status</Box>
          </Box>

          {/* =========================================
              ROWS
          ========================================= */}

          {leaderboard.map(item => (
            <Box
              key={item.studentId._id}
              sx={{
                display: {
                  xs: "block",
                  md: "grid",
                },

                gridTemplateColumns: "70px 2fr 1fr 1.5fr 120px 120px 100px",

                gap: 2,

                p: 2,

                borderTop: "1px solid #e2e8f0",

                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              }}>
              {/* Rank */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                  }}>
                  #{item.rank}
                </Typography>
              </Box>

              {/* Student */}

              <Box
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}>
                  {item.studentId.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                  }}>
                  {item.studentId.email}
                </Typography>
              </Box>

              {/* Standard */}

              <Box
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography>{item.studentId.standard} th</Typography>
              </Box>

              {/* Exam */}

              <Box
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography>{item.examId?.title || "Exam"}</Typography>
              </Box>

              {/* Score */}

              <Box
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}>
                  {item.score} / {item.totalMarks}
                </Typography>
              </Box>

              {/* Percentage */}

              <Box
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}>
                  {item.percentage.toFixed(2)}%
                </Typography>
              </Box>

              {/* Status */}

              <Box>
                <Chip
                  label={item.status}
                  size="small"
                  color={item.status === "PASS" ? "success" : "error"}
                />
              </Box>
            </Box>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default StudentLeaderboard;
