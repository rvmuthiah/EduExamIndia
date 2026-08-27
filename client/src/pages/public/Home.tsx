import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";

import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SchoolIcon sx={{fontSize: 42}} />,
      title: "For Every Student",
      description:
        "Designed for students from 6th to 12th standard with a simple and easy-to-use examination experience.",
    },
    {
      icon: <AssignmentIcon sx={{fontSize: 42}} />,
      title: "Online Examinations",
      description:
        "Take online examinations in a structured environment and practice your knowledge from anywhere.",
    },
    {
      icon: <EmojiEventsIcon sx={{fontSize: 42}} />,
      title: "Track Your Performance",
      description:
        "Review your examination results and understand your performance after completing an exam.",
    },
  ];

  const benefits = [
    "Easy online examination experience",
    "Suitable for students from 6th to 12th standard",
    "Organized exams and schedules",
    "Simple and student-friendly interface",
    "Access examinations from anywhere",
    "View your examination results",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
      }}>
      {/* ================= HEADER ================= */}

      <Box
        component="header"
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}>
            {/* Logo */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  backgroundColor: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}>
                <SchoolIcon />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "#0f172a",
                  }}>
                  RankOne
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                  }}>
                  EduExamIndia
                </Typography>
              </Box>
            </Box>

            {/* Navigation */}

            <Box
              sx={{
                display: {xs: "none", md: "flex"},
                alignItems: "center",
                gap: 1,
              }}>
              <Button
                onClick={() => navigate("/")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Home
              </Button>

              <Button
                onClick={() => navigate("/about")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                About Us
              </Button>

              <Button
                onClick={() => navigate("/how-it-works")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                How It Works
              </Button>

              <Button
                onClick={() => navigate("/exam-timetable")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Exam Timetable
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/student/login")}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  fontWeight: 700,
                  backgroundColor: "#1976d2",
                }}>
                Student Login
              </Button>
            </Box>

            {/* Mobile Login */}

            <Button
              variant="contained"
              onClick={() => navigate("/student/login")}
              sx={{
                display: {xs: "inline-flex", md: "none"},
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 700,
                backgroundColor: "#1976d2",
              }}>
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ================= HERO ================= */}

      <Box
        component="section"
        sx={{
          background:
            "linear-gradient(135deg, #eaf4ff 0%, #ffffff 55%, #f0f7ff 100%)",
          py: {
            xs: 7,
            md: 10,
          },
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: "center",
              gap: {
                xs: 5,
                md: 8,
              },
            }}>
            {/* Hero Content */}

            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}>
              <Typography
                sx={{
                  display: "inline-flex",
                  px: 2,
                  py: 0.8,
                  borderRadius: 10,
                  backgroundColor: "#dbeafe",
                  color: "#1d4ed8",
                  fontSize: 14,
                  fontWeight: 700,
                  mb: 2.5,
                }}>
                Online Examination Platform
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2.4rem",
                    sm: "3.2rem",
                    md: "4rem",
                  },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  color: "#0f172a",
                  mb: 2.5,
                }}>
                Learn. Practice.
                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: "inline",
                      md: "block",
                    },
                    color: "#1976d2",
                  }}>
                  Perform Better.
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: 620,
                  color: "#475569",
                  fontSize: {
                    xs: "1rem",
                    md: "1.15rem",
                  },
                  lineHeight: 1.8,
                  mb: 4,
                }}>
                RankOne is an online examination platform designed to help
                students from 6th to 12th standard prepare, practice and
                evaluate their knowledge through online examinations.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/student/login")}
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    backgroundColor: "#1976d2",
                  }}>
                  Start Your Exam
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/how-it-works")}
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}>
                  How It Works
                </Button>
              </Box>
            </Box>

            {/* Hero Illustration */}

            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  minHeight: {
                    xs: 280,
                    md: 380,
                  },
                  borderRadius: 5,
                  backgroundColor: "#ffffff",
                  border: "1px solid #dbeafe",
                  boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
                  p: {
                    xs: 3,
                    md: 5,
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      backgroundColor: "#eaf4ff",
                      color: "#1976d2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}>
                    <MenuBookIcon sx={{fontSize: 48}} />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                      mb: 1,
                    }}>
                    Your Learning Journey
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      mb: 3,
                    }}>
                    Prepare for your examinations with a simple and organized
                    online experience.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}>
                    {["Practice", "Exam", "Result"].map(item => (
                      <Box
                        key={item}
                        sx={{
                          px: 2,
                          py: 0.8,
                          borderRadius: 5,
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          fontSize: 14,
                          fontWeight: 600,
                        }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================= FEATURES ================= */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 9,
          },
          backgroundColor: "#ffffff",
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 720,
              mx: "auto",
              mb: 5,
            }}>
            <Typography
              sx={{
                color: "#1976d2",
                fontWeight: 700,
                fontSize: 15,
                mb: 1,
              }}>
              WHY RANKONE
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "2.6rem",
                },
                fontWeight: 800,
                color: "#0f172a",
                mb: 2,
              }}>
              Everything Students Need to Practice Better
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
              }}>
              A student-friendly examination experience built around learning,
              practice and performance.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}>
            {features.map(feature => (
              <Card
                key={feature.title}
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(15, 23, 42, 0.08)",
                  },
                }}>
                <CardContent
                  sx={{
                    p: 4,
                  }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 3,
                      backgroundColor: "#eaf4ff",
                      color: "#1976d2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}>
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                      mb: 1.5,
                    }}>
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                    }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ================= BENEFITS ================= */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 9,
          },
          backgroundColor: "#f8fafc",
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: 5,
                md: 9,
              },
              alignItems: "center",
            }}>
            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}>
              <Typography
                sx={{
                  color: "#1976d2",
                  fontWeight: 700,
                  mb: 1,
                }}>
                BUILT FOR STUDENTS
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "2.7rem",
                  },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: "#0f172a",
                  mb: 2,
                }}>
                A Simple Way to Prepare for Examinations
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  mb: 3,
                }}>
                RankOne provides an organized platform where students can access
                examinations and review their performance in one place.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.7,
                }}>
                {benefits.map(benefit => (
                  <Box
                    key={benefit}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}>
                    <CheckCircleIcon
                      sx={{
                        color: "#1976d2",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#334155",
                        fontWeight: 500,
                      }}>
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #dbeafe",
                  backgroundColor: "#ffffff",
                  p: {
                    xs: 3,
                    md: 5,
                  },
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  }}>
                  <Box
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: 2,
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <GroupsIcon />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#0f172a",
                      }}>
                      Student Focused
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                      }}>
                      Learn and evaluate
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{mb: 3}} />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    mb: 1.5,
                  }}>
                  Practice with confidence
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.8,
                    mb: 3,
                  }}>
                  Take your examinations online and use your results to
                  understand your performance and prepare better.
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/student/login")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 700,
                    backgroundColor: "#1976d2",
                  }}>
                  Student Login
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================= CTA ================= */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 9,
          },
          backgroundColor: "#1976d2",
        }}>
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
            }}>
            <Typography
              component="h2"
              sx={{
                color: "#ffffff",
                fontSize: {
                  xs: "2rem",
                  md: "2.7rem",
                },
                fontWeight: 800,
                mb: 2,
              }}>
              Ready to Start Your Examination?
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.9)",
                maxWidth: 650,
                mx: "auto",
                lineHeight: 1.8,
                mb: 4,
              }}>
              Login to your student account and start exploring your available
              examinations.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/student/login")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "#1976d2",
                px: 4,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 800,
                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              }}>
              Student Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}

      <Box
        component="footer"
        sx={{
          backgroundColor: "#0f172a",
          color: "#ffffff",
          py: 5,
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              gap: 3,
            }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                  mb: 0.5,
                }}>
                RankOne
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#94a3b8",
                }}>
                EduExamIndia
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}>
              <Button
                onClick={() => navigate("/")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                Home
              </Button>

              <Button
                onClick={() => navigate("/about")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                About Us
              </Button>

              <Button
                onClick={() => navigate("/contact")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                Contact
              </Button>
            </Box>
          </Box>

          <Divider
            sx={{
              my: 3,
              borderColor: "#334155",
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              textAlign: "center",
            }}>
            © {new Date().getFullYear()} RankOne - EduExamIndia. All rights
            reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
