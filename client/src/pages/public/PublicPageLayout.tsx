import {Box, Button, Container, Typography} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import type {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

interface PublicPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PublicPageLayout = ({
  children,
  title,
  subtitle,
}: PublicPageLayoutProps) => {
  const navigate = useNavigate();

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
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
              }}>
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

            {/* Desktop Navigation */}

            <Box
              sx={{
                display: {xs: "none", md: "flex"},
                alignItems: "center",
                gap: 0.5,
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
                onClick={() => navigate("/boards")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Boards
              </Button>

              <Button
                onClick={() => navigate("/standards")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Standards
              </Button>

              <Button
                onClick={() => navigate("/exam-timetable")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Timetable
              </Button>

              <Button
                onClick={() => navigate("/exam-schedule")}
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                }}>
                Schedule
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
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
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

      {/* ================= PAGE HEADER ================= */}

      <Box
        sx={{
          background: "linear-gradient(135deg, #eaf4ff 0%, #ffffff 100%)",
          py: {
            xs: 6,
            md: 8,
          },
        }}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              fontWeight: 800,
              color: "#0f172a",
              mb: 1.5,
            }}>
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                maxWidth: 750,
                color: "#64748b",
                lineHeight: 1.8,
                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },
              }}>
              {subtitle}
            </Typography>
          )}
        </Container>
      </Box>

      {/* ================= CONTENT ================= */}

      <Box
        component="main"
        sx={{
          py: {
            xs: 5,
            md: 8,
          },
        }}>
        <Container maxWidth="lg">{children}</Container>
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
                onClick={() => navigate("/boards")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                Boards
              </Button>

              <Button
                onClick={() => navigate("/standards")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                Standards
              </Button>

              <Button
                onClick={() => navigate("/exam-timetable")}
                sx={{
                  color: "#cbd5e1",
                  textTransform: "none",
                }}>
                Timetable
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #334155",
              mt: 3,
              pt: 3,
            }}>
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                textAlign: "center",
              }}>
              © {new Date().getFullYear()} RankOne - EduExamIndia. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicPageLayout;
