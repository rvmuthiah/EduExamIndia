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

import PublicHeader from "../../components/public/PublicHeader";
import PublicFooter from "../../components/public/PublicFooter";

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
      {/* =====================================================
          PUBLIC HEADER
      ===================================================== */}

      <PublicHeader />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

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
            {/* =================================================
                HERO CONTENT
            ================================================= */}

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

              {/* HERO BUTTONS */}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}>
                {/* SIGN UP */}

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/student/register")}
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    backgroundColor: "#1976d2",
                  }}>
                  Create Student Account
                </Button>

                {/* LOGIN */}

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/student/login")}
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}>
                  Student Login
                </Button>

                {/* HOW IT WORKS */}

                <Button
                  variant="text"
                  size="large"
                  onClick={() => navigate("/how-it-works")}
                  sx={{
                    px: 2,
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

            {/* =================================================
                HERO ILLUSTRATION
            ================================================= */}

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

      {/* =====================================================
          FEATURES
      ===================================================== */}

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

      {/* =====================================================
          BENEFITS
      ===================================================== */}

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
            {/* LEFT */}

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

            {/* RIGHT */}

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
                  onClick={() => navigate("/student/register")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 700,
                    backgroundColor: "#1976d2",
                  }}>
                  Create Student Account
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          STUDENT SIGN-UP CTA
      ===================================================== */}

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
              New Student? Create Your Account
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.9)",
                maxWidth: 650,
                mx: "auto",
                lineHeight: 1.8,
                mb: 4,
              }}>
              Join EduExamIndia and start your online examination journey.
              Create your student account today and get ready for regular
              practice and assessments.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
              }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/student/register")}
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
                Sign Up Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/student/login")}
                sx={{
                  color: "#ffffff",
                  borderColor: "#ffffff",
                  px: 4,
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}>
                Student Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          PUBLIC FOOTER
      ===================================================== */}

      <PublicFooter />
    </Box>
  );
};

export default Home;
