import {Box, Button, Card, CardContent, Chip, Typography} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import PublicPageLayout from "./PublicPageLayout";
import {useNavigate} from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Basic",
      description:
        "A simple option for students who want to explore online examination practice.",
      features: [
        "Online examination access",
        "Student-friendly interface",
        "Organized examination experience",
        "View examination results",
      ],
    },
    {
      title: "Standard",
      description:
        "A balanced option for students looking for regular examination practice.",
      features: [
        "Everything in Basic",
        "Regular examination practice",
        "Performance tracking",
        "Organized exam schedules",
      ],
      popular: true,
    },
    {
      title: "Premium",
      description:
        "A comprehensive option for students who want an enhanced examination experience.",
      features: [
        "Everything in Standard",
        "More examination opportunities",
        "Performance review",
        "Continuous learning support",
      ],
    },
  ];

  return (
    <PublicPageLayout
      title="Pricing"
      subtitle="Choose an examination plan that suits your learning and preparation needs.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}>
        {plans.map(plan => (
          <Card
            key={plan.title}
            elevation={0}
            sx={{
              height: "100%",
              position: "relative",
              border: plan.popular ? "2px solid #1976d2" : "1px solid #e2e8f0",
              borderRadius: 3,
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 15px 35px rgba(15, 23, 42, 0.08)",
              },
            }}>
            {plan.popular && (
              <Chip
                label="Popular"
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  fontWeight: 700,
                }}
              />
            )}

            <CardContent sx={{p: 4}}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  backgroundColor: "#eaf4ff",
                  color: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}>
                <SchoolIcon sx={{fontSize: 34}} />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  mb: 1.5,
                }}>
                {plan.title}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  mb: 3,
                }}>
                {plan.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mb: 3,
                }}>
                {plan.features.map(feature => (
                  <Box
                    key={feature}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>
                    <CheckCircleIcon
                      sx={{
                        color: "#1976d2",
                        fontSize: 20,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#334155",
                        fontSize: 14,
                      }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant={plan.popular ? "contained" : "outlined"}
                onClick={() => navigate("/student/login")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 700,
                  py: 1.2,
                }}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          p: {
            xs: 3,
            md: 4,
          },
          borderRadius: 3,
          backgroundColor: "#eff6ff",
          border: "1px solid #dbeafe",
          display: "flex",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          gap: 2,
        }}>
        <SchoolIcon
          sx={{
            color: "#1976d2",
            fontSize: 35,
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 0.5,
            }}>
            Simple and Student Friendly
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.7,
            }}>
            Our goal is to provide students with a simple, organized and
            accessible online examination experience.
          </Typography>
        </Box>
      </Box>
    </PublicPageLayout>
  );
};

export default Pricing;
