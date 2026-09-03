import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

const PublicFooter = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0F172A",
        color: "#CBD5E1",
        mt: 8,
      }}>
      <Container
        maxWidth="lg"
        sx={{py: {xs: 4, md: 6}}}>
        <Grid
          container
          spacing={{xs: 4, md: 6}}>
          {/* Brand */}
          <Grid size={{xs: 12, md: 5}}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                }}>
                EduExamIndia
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  maxWidth: 520,
                  lineHeight: 1.8,
                  color: "#CBD5E1",
                }}>
                A student-focused online examination platform designed to make
                practice, assessment and academic preparation simple and
                accessible.
              </Typography>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Stack spacing={1.2}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 0.5,
                }}>
                Quick Links
              </Typography>

              <Link
                component="button"
                onClick={() => handleNavigation("/")}
                sx={linkStyle}>
                Home
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/about")}
                sx={linkStyle}>
                About Us
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/how-it-works")}
                sx={linkStyle}>
                How It Works
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/boards")}
                sx={linkStyle}>
                Boards
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/standards")}
                sx={linkStyle}>
                Standards
              </Link>
            </Stack>
          </Grid>

          {/* Exams */}
          <Grid size={{xs: 12, sm: 6, md: 4}}>
            <Stack spacing={1.2}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 0.5,
                }}>
                Exams & Students
              </Typography>

              <Link
                component="button"
                onClick={() => handleNavigation("/exam-timetable")}
                sx={linkStyle}>
                Exam Timetable
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/exam-schedule")}
                sx={linkStyle}>
                Exam Schedule
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/student/login")}
                sx={linkStyle}>
                Student Login
              </Link>

              <Link
                component="button"
                onClick={() => handleNavigation("/student/register")}
                sx={linkStyle}>
                Student Registration
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(255,255,255,0.12)",
          }}
        />

        <Stack
          direction={{xs: "column", sm: "row"}}
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: {xs: "flex-start", sm: "center"},
          }}>
          <Typography
            variant="body2"
            sx={{
              color: "#94A3B8",
              textAlign: {xs: "left", sm: "center"},
            }}>
            © {new Date().getFullYear()} EduExamIndia. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
            }}>
            Learn • Practice • Improve
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

const linkStyle = {
  color: "#CBD5E1",
  fontSize: "0.9rem",
  textDecoration: "none",
  justifyContent: "flex-start",
  padding: 0,
  width: "fit-content",
  fontFamily: "inherit",
  cursor: "pointer",
  "&:hover": {
    color: "#fff",
    textDecoration: "underline",
  },
};

export default PublicFooter;
