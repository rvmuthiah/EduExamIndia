import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QuizIcon from "@mui/icons-material/Quiz";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

// import axios from "axios";
import api from "../services/api";

import {getStudentResults} from "../services/result.service";

// =====================================================
// RESULT TYPE
// =====================================================

interface StudentResult {
  _id?: string;

  attemptId?: string;

  score: number;
  totalMarks: number;
  percentage: number;

  correctAnswers: number;
  wrongAnswers: number;

  status: "PASS" | "FAIL";

  createdAt?: string;

  examId?: {
    _id: string;
    title: string;
  };
}

// =====================================================
// LEADERBOARD TYPE
// =====================================================

interface LeaderboardItem {
  rank: number;

  studentId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        board?: string;
        standard?: number;
      };

  score: number;
  totalMarks: number;
  percentage: number;

  correctAnswers: number;
  wrongAnswers: number;

  status: "PASS" | "FAIL";

  examId?: {
    _id: string;
    title: string;
  };
}

// =====================================================
// DASHBOARD
// =====================================================

const StudentDashboard = () => {
  const navigate = useNavigate();

  // ===================================================
  // STUDENT INFORMATION
  // ===================================================

  const studentName = localStorage.getItem("studentName") || "Student";

  const username = localStorage.getItem("username") || "";

  const studentId = localStorage.getItem("studentId") || "";

  // ===================================================
  // STATES
  // ===================================================

  const [results, setResults] = useState<StudentResult[]>([]);

  const [rank, setRank] = useState<number | null>(null);

  const [loadingStats, setLoadingStats] = useState(true);

  // ===================================================
  // LOAD DASHBOARD DATA
  // ===================================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoadingStats(true);

        // =================================================
        // CHECK STUDENT ID
        // =================================================

        if (!studentId) {
          console.error("STUDENT ID NOT FOUND");

          setResults([]);
          setRank(null);

          return;
        }

        // =================================================
        // GET STUDENT RESULTS
        // =================================================

        const resultResponse = await getStudentResults(studentId);

        console.log("DASHBOARD STUDENT RESULTS:", resultResponse);

        if (resultResponse.success && Array.isArray(resultResponse.data)) {
          setResults(resultResponse.data);
        } else {
          setResults([]);
        }

        // =================================================
        // GET LEADERBOARD
        // =================================================

        const token = localStorage.getItem("token");

        const leaderboardResponse = await api.get(
          "/students/leaderboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("DASHBOARD LEADERBOARD:", leaderboardResponse.data);

        if (
          leaderboardResponse.data?.success &&
          Array.isArray(leaderboardResponse.data.data)
        ) {
          const leaderboard: LeaderboardItem[] = leaderboardResponse.data.data;

          // =================================================
          // FIND CURRENT STUDENT
          // =================================================

          const currentStudent = leaderboard.find(item => {
            const currentStudentId =
              typeof item.studentId === "string"
                ? item.studentId
                : item.studentId?._id;

            return currentStudentId === studentId;
          });

          if (currentStudent) {
            setRank(currentStudent.rank);
          } else {
            setRank(null);
          }
        } else {
          setRank(null);
        }
      } catch (error: unknown) {
        console.error("DASHBOARD ERROR:", error);

        setResults([]);
        setRank(null);
      } finally {
        setLoadingStats(false);
      }
    };

    void loadDashboard();
  }, [studentId]);

  // =====================================================
  // REAL STATISTICS
  // =====================================================

  const statistics = useMemo(() => {
    const examsTaken = results.length;

    const passedExams = results.filter(
      result => result.status === "PASS",
    ).length;

    const failedExams = results.filter(
      result => result.status === "FAIL",
    ).length;

    const totalCorrect = results.reduce(
      (total, result) => total + Number(result.correctAnswers || 0),
      0,
    );

    const totalWrong = results.reduce(
      (total, result) => total + Number(result.wrongAnswers || 0),
      0,
    );

    const totalQuestions = totalCorrect + totalWrong;

    const averagePercentage =
      examsTaken > 0
        ? results.reduce(
            (total, result) => total + Number(result.percentage || 0),
            0,
          ) / examsTaken
        : 0;

    const bestPercentage =
      examsTaken > 0
        ? Math.max(...results.map(result => Number(result.percentage || 0)))
        : 0;

    return {
      examsTaken,
      passedExams,
      failedExams,
      totalCorrect,
      totalWrong,
      totalQuestions,
      averagePercentage,
      bestPercentage,
    };
  }, [results]);

  // =====================================================
  // RECENT RESULTS
  // =====================================================

  const recentResults = useMemo(() => {
    return results
      .slice()
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;

        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [results]);

  // =====================================================
  // DASHBOARD STAT CARD
  // =====================================================

  const statCards = [
    {
      title: "Exams Taken",
      value: statistics.examsTaken,
      icon: <QuizIcon sx={{fontSize: 38}} />,
      description: "Total exams completed",
      action: () => navigate("/student/results"),
    },

    {
      title: "Average Score",
      value: `${statistics.averagePercentage.toFixed(2)}%`,
      icon: <AssessmentIcon sx={{fontSize: 38}} />,
      description: "Your average performance",
      action: () => navigate("/student/results"),
    },

    {
      title: "Best Score",
      value: `${statistics.bestPercentage.toFixed(2)}%`,
      icon: <StarIcon sx={{fontSize: 38}} />,
      description: "Your highest percentage",
      action: () => navigate("/student/results"),
    },

    {
      title: "Leaderboard Rank",
      value: rank !== null ? `#${rank}` : "--",
      icon: <EmojiEventsIcon sx={{fontSize: 38}} />,
      description: "Your current ranking",
      action: () => navigate("/student/leaderboard"),
    },
  ];

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingStats) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        px: {
          xs: 1,
          sm: 2,
          md: 3,
        },
        py: 2,
      }}>
      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          mb: 3,
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
        }}>
        <CardContent
          sx={{
            p: {
              xs: 3,
              md: 4,
            },
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}>
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <SchoolIcon sx={{fontSize: 34}} />
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "1.7rem",
                    md: "2.2rem",
                  },
                }}>
                Welcome, {studentName}! 👋
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  opacity: 0.9,
                }}>
                {username}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  opacity: 0.95,
                }}>
                Keep learning. Keep improving. Keep moving up the RankOne
                leaderboard! 🚀
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 2,
        }}>
        My Performance
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{mb: 4}}>
        {statCards.map(card => (
          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                },
              }}
              onClick={card.action}>
              <CardContent
                sx={{
                  p: 3,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                      }}>
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        mt: 1,
                        color: "#0f172a",
                      }}>
                      {card.value}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mt: 1,
                      }}>
                      {card.description}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      color: "#1976d2",
                    }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* =================================================
          PERFORMANCE SUMMARY
      ================================================= */}

      <Grid
        container
        spacing={2}
        sx={{mb: 4}}>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}>
            <CardContent sx={{p: 3}}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                }}>
                Exam Summary
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}>
                <Typography>Exams Taken</Typography>

                <Typography sx={{fontWeight: 700}}>
                  {statistics.examsTaken}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}>
                <Typography>Passed</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "success.main",
                  }}>
                  {statistics.passedExams}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}>
                <Typography>Failed</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "error.main",
                  }}>
                  {statistics.failedExams}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}>
            <CardContent sx={{p: 3}}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                }}>
                Answer Statistics
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}>
                <Typography>Total Questions</Typography>

                <Typography sx={{fontWeight: 700}}>
                  {statistics.totalQuestions}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}>
                <Typography>Correct Answers</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "success.main",
                  }}>
                  {statistics.totalCorrect}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <Typography>Wrong Answers</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "error.main",
                  }}>
                  {statistics.totalWrong}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/student/leaderboard")}>
            <CardContent
              sx={{
                p: 3,
                textAlign: "center",
              }}>
              <EmojiEventsIcon
                sx={{
                  fontSize: 48,
                  color: "#f59e0b",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mt: 1,
                }}>
                Leaderboard
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mt: 1,
                }}>
                {rank !== null ? `#${rank}` : "--"}
              </Typography>

              <Typography color="text.secondary">Current Rank</Typography>

              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  fontWeight: 700,
                }}
                onClick={event => {
                  event.stopPropagation();

                  navigate("/student/leaderboard");
                }}>
                View Leaderboard
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =================================================
          RECENT RESULTS
      ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          mb: 4,
        }}>
        <CardContent
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
              }}>
              Recent Results
            </Typography>

            <Button
              variant="outlined"
              onClick={() => navigate("/student/results")}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}>
              View All
            </Button>
          </Box>

          {recentResults.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 5,
              }}>
              <AssessmentIcon
                sx={{
                  fontSize: 55,
                  color: "#94a3b8",
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                }}>
                No exam results yet
              </Typography>

              <Typography
                color="text.secondary"
                sx={{mt: 0.5}}>
                Complete your first exam to see your performance here.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              {recentResults.map((result, index) => (
                <Box
                  key={result._id || `${result.examId?._id}-${index}`}
                  sx={{
                    p: 2,
                    border: "1px solid #e2e8f0",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                  }}>
                  {/* EXAM */}

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 180,
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                      }}>
                      {result.examId?.title || "Exam"}
                    </Typography>

                    {result.createdAt && (
                      <Typography
                        variant="caption"
                        color="text.secondary">
                        {new Date(result.createdAt).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>

                  {/* SCORE */}

                  <Box
                    sx={{
                      minWidth: 100,
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}>
                      {result.score} / {result.totalMarks}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary">
                      Score
                    </Typography>
                  </Box>

                  {/* PERCENTAGE */}

                  <Box
                    sx={{
                      minWidth: 90,
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                      }}>
                      {Number(result.percentage || 0).toFixed(2)}%
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary">
                      Percentage
                    </Typography>
                  </Box>

                  {/* STATUS */}

                  <Box
                    sx={{
                      minWidth: 70,
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color:
                          result.status === "PASS"
                            ? "success.main"
                            : "error.main",
                      }}>
                      {result.status}
                    </Typography>
                  </Box>

                  {/* VIEW */}

                  <Button
                    variant="contained"
                    size="small"
                    disabled={!result.attemptId}
                    onClick={() => {
                      if (result.attemptId) {
                        navigate(`/student/results/${result.attemptId}`);
                      }
                    }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}>
                    View Result
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e2e8f0",
        }}>
        <CardContent sx={{p: 3}}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}>
            Quick Actions
          </Typography>

          <Grid
            container
            spacing={2}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SchoolIcon />}
                onClick={() => navigate("/student/exams")}
                sx={{
                  minHeight: 52,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                }}>
                View Exams
              </Button>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AssessmentIcon />}
                onClick={() => navigate("/student/results")}
                sx={{
                  minHeight: 52,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                }}>
                My Results
              </Button>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmojiEventsIcon />}
                onClick={() => navigate("/student/leaderboard")}
                sx={{
                  minHeight: 52,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                }}>
                Leaderboard
              </Button>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PersonIcon />}
                onClick={() => navigate("/student/profile")}
                sx={{
                  minHeight: 52,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                }}>
                My Profile
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentDashboard;
