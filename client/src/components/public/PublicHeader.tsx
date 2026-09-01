import {useState} from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";

import {useNavigate} from "react-router-dom";

const PublicHeader = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  // =====================================================
  // OPEN MOBILE MENU
  // =====================================================

  const handleMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = (path: string) => {
    handleMenuClose();
    navigate(path);
  };

  // =====================================================
  // MENU ITEMS
  // =====================================================

  const menuItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Boards",
      path: "/boards",
    },
    {
      label: "Standards",
      path: "/standards",
    },
    {
      label: "Exam Timetable",
      path: "/exam-timetable",
    },
    {
      label: "Exam Schedule",
      path: "/exam-schedule",
    },
  ];

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          backgroundColor: "#1976d2",
        }}>
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              md: 72,
            },
            px: {
              xs: 2,
              md: 4,
            },
            display: "flex",
            justifyContent: "space-between",
          }}>
          {/* =================================================
              LOGO
          ================================================= */}

          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}>
            <SchoolIcon
              sx={{
                fontSize: {
                  xs: 30,
                  md: 34,
                },
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.25rem",
                  md: "1.4rem",
                },
              }}>
              EduExamIndia
            </Typography>
          </Box>

          {/* =================================================
              DESKTOP MENU
          ================================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}>
            {menuItems.map(item => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}>
                {item.label}
              </Button>
            ))}

            {/* STUDENT LOGIN */}

            <Button
              variant="outlined"
              onClick={() => handleNavigation("/student/login")}
              sx={{
                ml: 1,
                color: "white",
                borderColor: "white",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}>
              Student Login
            </Button>
          </Box>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <IconButton
            onClick={handleMenuOpen}
            aria-label="Open menu"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "white",
            }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMenuClose}>
        <Box
          sx={{
            width: "min(86vw, 340px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
          {/* =================================================
              DRAWER HEADER
          ================================================= */}

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
              }}>
              EduExamIndia
            </Typography>

            <IconButton
              onClick={handleMenuClose}
              aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          {/* =================================================
              MOBILE NAVIGATION
          ================================================= */}

          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}>
            {menuItems.map(item => (
              <Button
                key={item.path}
                fullWidth
                onClick={() => handleNavigation(item.path)}
                sx={{
                  justifyContent: "flex-start",
                  color: "text.primary",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 1.2,
                }}>
                {item.label}
              </Button>
            ))}

            <Divider sx={{my: 1}} />

            {/* =================================================
                STUDENT LOGIN
            ================================================= */}

            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavigation("/student/login")}
              sx={{
                fontWeight: 700,
                textTransform: "none",
                py: 1.2,
              }}>
              Student Login
            </Button>

            {/* =================================================
                STUDENT REGISTER
            ================================================= */}

            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleNavigation("/student/register")}
              sx={{
                fontWeight: 700,
                textTransform: "none",
                py: 1.2,
              }}>
              Student Registration
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PublicHeader;
