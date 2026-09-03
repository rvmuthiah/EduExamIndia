import {Box, Button, Container, Paper, Stack, Typography} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaymentIcon from "@mui/icons-material/Payment";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SendIcon from "@mui/icons-material/Send";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import {useNavigate} from "react-router-dom";
import PublicPageLayout from "./PublicPageLayout";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: <SchoolIcon sx={{fontSize: 38}} />,
      title: "Choose Your Board",
      description:
        "Select the board that matches your school curriculum, such as State Board, Matriculation, CBSE or other available boards.",
    },
    {
      number: "02",
      icon: <AppRegistrationIcon sx={{fontSize: 38}} />,
      title: "Choose Your Standard",
      description:
        "Select your class or standard and explore the examinations available for your academic level.",
    },
    {
      number: "03",
      icon: <PaymentIcon sx={{fontSize: 38}} />,
      title: "Register & Subscribe",
      description:
        "Create your student account and complete the required subscription or examination payment to become eligible.",
    },
    {
      number: "04",
      icon: <FactCheckIcon sx={{fontSize: 38}} />,
      title: "Check Exam Eligibility",
      description:
        "After registration and payment, check your dashboard to see the examinations available for you.",
    },
    {
      number: "05",
      icon: <PlayArrowIcon sx={{fontSize: 38}} />,
      title: "Take Your Exam",
      description:
        "Start the scheduled online examination and answer the objective-type questions within the allotted examination time.",
    },
    {
      number: "06",
      icon: <SendIcon sx={{fontSize: 38}} />,
      title: "Submit Your Answers",
      description:
        "Complete the examination and submit your answers. The examination will also end automatically when the allowed time expires.",
    },
    {
      number: "07",
      icon: <EmojiEventsIcon sx={{fontSize: 38}} />,
      title: "View Your Result",
      description:
        "After evaluation, view your marks, performance and examination result through your student account.",
    },
  ];

  return (
    <PublicPageLayout
      title="How It Works"
      subtitle="Follow a simple step-by-step process to register, prepare, attend your online examination and view your result.">
      <Container
        maxWidth="lg"
        sx={{
          py: {xs: 2, md: 4},
        }}>
        <Stack spacing={5}>
          {/* Introduction */}
          <Box
            sx={{
              maxWidth: 850,
              mx: "auto",
              textAlign: "center",
            }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                mb: 2,
              }}>
              Your Exam Journey
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                lineHeight: 1.9,
                fontSize: "1.05rem",
              }}>
              EduExamIndia makes online examination practice simple. Choose your
              academic details, create your student account, complete
              registration, attend eligible examinations and view your
              performance.
            </Typography>
          </Box>

          {/* Steps */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}>
            {steps.map(step => (
              <Paper
                key={step.number}
                elevation={0}
                sx={{
                  position: "relative",
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#fff",
                  transition: "0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 28px rgba(15,23,42,0.08)",
                  },
                }}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Box
                      sx={{
                        width: 54,
                        height: 54,
                        borderRadius: 2,
                        bgcolor: "#EFF6FF",
                        color: "#1976D2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {step.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "#E2E8F0",
                      }}>
                      {step.number}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0F172A",
                    }}>
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      lineHeight: 1.75,
                    }}>
                    {step.description}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Box>

          {/* Exam Flow */}
          <Paper
            elevation={0}
            sx={{
              p: {xs: 3, md: 5},
              borderRadius: 3,
              backgroundColor: "#F1F5F9",
              border: "1px solid #E2E8F0",
            }}>
            <Stack spacing={3}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  textAlign: "center",
                }}>
                Simple Examination Flow
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: {xs: 1.5, md: 2},
                }}>
                {[
                  "Register",
                  "Subscribe",
                  "Check Eligibility",
                  "Start Exam",
                  "Answer Questions",
                  "Submit",
                  "Result",
                ].map((item, index, array) => (
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {xs: 1, md: 2},
                    }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: "#fff",
                        border: "1px solid #CBD5E1",
                      }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#334155",
                        }}>
                        {item}
                      </Typography>
                    </Box>

                    {index < array.length - 1 && (
                      <Typography
                        sx={{
                          color: "#94A3B8",
                          fontWeight: 700,
                        }}>
                        →
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Stack>
          </Paper>

          {/* CTA */}
          <Paper
            elevation={0}
            sx={{
              p: {xs: 3, md: 5},
              borderRadius: 3,
              background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
              border: "1px solid #BFDBFE",
            }}>
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                textAlign: "center",
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                }}>
                Ready to Get Started?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  maxWidth: 650,
                  lineHeight: 1.7,
                }}>
                Create your student account and start your online examination
                journey with EduExamIndia.
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

export default HowItWorks;
