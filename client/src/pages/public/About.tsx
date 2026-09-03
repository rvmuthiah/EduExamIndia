import {Box, Button, Container, Paper, Stack, Typography} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";

import {useNavigate} from "react-router-dom";
import PublicPageLayout from "./PublicPageLayout";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SchoolIcon sx={{fontSize: 38}} />,
      title: "Student Focused",
      description:
        "EduExamIndia is designed around the needs of school students and their academic preparation.",
    },
    {
      icon: <CheckCircleIcon sx={{fontSize: 38}} />,
      title: "Regular Practice",
      description:
        "Students can take online objective examinations and regularly practice their subjects.",
    },
    {
      icon: <TrendingUpIcon sx={{fontSize: 38}} />,
      title: "Track Progress",
      description:
        "Students can view their examination results and monitor their academic performance.",
    },
    {
      icon: <SecurityIcon sx={{fontSize: 38}} />,
      title: "Secure Platform",
      description:
        "Student accounts and examination attempts are managed through a secure online system.",
    },
  ];

  return (
    <PublicPageLayout
      title="About EduExamIndia"
      subtitle="Helping students practice, assess their knowledge and improve their academic performance through online examinations.">
      <Container
        maxWidth="lg"
        sx={{
          py: {xs: 2, md: 4},
        }}>
        <Stack spacing={5}>
          {/* About Content */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                mb: 2,
              }}>
              What is EduExamIndia?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                lineHeight: 1.9,
                fontSize: "1.05rem",
                maxWidth: 900,
              }}>
              EduExamIndia is a student-focused online examination platform
              created to provide students with a simple and accessible way to
              practice objective-type examinations. The platform is designed to
              support students in their regular academic preparation and help
              them understand their performance through online assessments.
            </Typography>
          </Box>

          {/* Our Purpose */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                mb: 2,
              }}>
              Our Purpose
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                lineHeight: 1.9,
                fontSize: "1.05rem",
                maxWidth: 900,
              }}>
              Our goal is to make examination practice easier for students.
              Instead of waiting only for school examinations, students can use
              regular online assessments to practice their subjects, identify
              areas that need improvement and build confidence.
            </Typography>
          </Box>

          {/* Features */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                mb: 3,
              }}>
              Why EduExamIndia?
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(4, 1fr)",
                },
                gap: 3,
              }}>
              {features.map(feature => (
                <Paper
                  key={feature.title}
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #E2E8F0",
                    borderRadius: 3,
                    transition: "0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                    },
                  }}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        color: "#1976D2",
                        display: "flex",
                        alignItems: "center",
                      }}>
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#0F172A",
                      }}>
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.7,
                      }}>
                      {feature.description}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Student CTA */}
          <Paper
            elevation={0}
            sx={{
              p: {xs: 3, md: 5},
              borderRadius: 3,
              backgroundColor: "#EFF6FF",
              border: "1px solid #BFDBFE",
            }}>
            <Stack
              spacing={2}
              sx={{
                alignItems: {xs: "flex-start", md: "center"},
                textAlign: {xs: "left", md: "center"},
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                }}>
                Ready to start your exam journey?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  maxWidth: 650,
                  lineHeight: 1.7,
                }}>
                Create your student account and get started with online
                examination practice.
              </Typography>

              <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={2}
                sx={{mt: 1}}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/student/register")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                  }}>
                  Student Registration
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/student/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                  }}>
                  Student Login
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </PublicPageLayout>
  );
};

export default About;
