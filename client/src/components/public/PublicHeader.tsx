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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
  // PUBLIC MENU ITEMS
  // =====================================================

  const menuItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About Us",
      path: "/about",
    },
    {
      label: "How It Works",
      path: "/how-it-works",
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
      {/* =====================================================
          PUBLIC HEADER
      ===================================================== */}

      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: "#ffffff",
          color: "#0f172a",
          borderBottom: "1px solid #e2e8f0",
        }}>
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              md: 70,
            },

            px: {
              xs: 2,
              sm: 2.5,
              md: 3,
              lg: 4,
            },

            gap: 1,
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
              flexShrink: 0,
              mr: {
                xs: 0,
                md: 1,
              },
            }}>
            <Box
              sx={{
                width: {
                  xs: 40,
                  md: 44,
                },
                height: {
                  xs: 40,
                  md: 44,
                },
                borderRadius: 2,
                backgroundColor: "#1976d2",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
              <SchoolIcon
                sx={{
                  fontSize: {
                    xs: 24,
                    md: 27,
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                },
              }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#0f172a",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                    md: "1.25rem",
                  },
                  whiteSpace: "nowrap",
                }}>
                RankOne
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: {
                    xs: "0.65rem",
                    sm: "0.7rem",
                    md: "0.72rem",
                  },
                  whiteSpace: "nowrap",
                }}>
                EduExamIndia
              </Typography>
            </Box>
          </Box>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },

              alignItems: "center",

              justifyContent: "flex-end",

              flex: 1,

              gap: 0.2,

              minWidth: 0,
            }}>
            {menuItems.map(item => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: "#334155",
                  fontWeight: 600,
                  textTransform: "none",

                  fontSize: {
                    lg: "0.86rem",
                    xl: "0.92rem",
                  },

                  px: {
                    lg: 0.75,
                    xl: 1,
                  },

                  whiteSpace: "nowrap",

                  minWidth: "auto",

                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                    color: "#1976d2",
                  },
                }}>
                {item.label}
              </Button>
            ))}

            {/* =================================================
                STUDENT LOGIN
            ================================================= */}

            <Button
              variant="contained"
              onClick={() => handleNavigation("/student/login")}
              sx={{
                ml: 0.7,

                px: {
                  lg: 1.5,
                  xl: 2,
                },

                py: 0.9,

                borderRadius: 2,

                backgroundColor: "#1976d2",

                color: "#ffffff",

                fontWeight: 700,

                textTransform: "none",

                fontSize: {
                  lg: "0.82rem",
                  xl: "0.9rem",
                },

                whiteSpace: "nowrap",

                minWidth: "auto",

                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}>
              Student Login
            </Button>

            {/* =================================================
                STUDENT SIGN UP
            ================================================= */}

            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => handleNavigation("/student/register")}
              sx={{
                ml: 0.6,

                px: {
                  lg: 1.3,
                  xl: 1.8,
                },

                py: 0.9,

                borderRadius: 2,

                borderWidth: 1.5,

                borderColor: "#1976d2",

                color: "#1976d2",

                fontWeight: 800,

                textTransform: "none",

                fontSize: {
                  lg: "0.82rem",
                  xl: "0.9rem",
                },

                whiteSpace: "nowrap",

                minWidth: "auto",

                "&:hover": {
                  borderWidth: 1.5,
                  borderColor: "#1565c0",
                  backgroundColor: "#eff6ff",
                },
              }}>
              Sign Up
            </Button>
          </Box>

          {/* =================================================
              TABLET / MOBILE MENU BUTTON
          ================================================= */}

          <Button
            variant="outlined"
            onClick={handleMenuOpen}
            startIcon={<MenuIcon />}
            aria-label="Open menu"
            sx={{
              display: {
                xs: "flex",
                lg: "none",
              },

              marginLeft: "auto",

              color: "#1976d2",

              borderColor: "#1976d2",

              fontWeight: 700,

              textTransform: "none",

              minWidth: "auto",

              px: {
                xs: 1.2,
                sm: 1.5,
              },

              py: 0.7,

              whiteSpace: "nowrap",

              "&:hover": {
                borderColor: "#1565c0",
                backgroundColor: "#eff6ff",
              },
            }}>
            Menu
          </Button>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE / TABLET DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMenuClose}>
        <Box
          sx={{
            width: "min(86vw, 360px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: "#1976d2",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <SchoolIcon />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1,
                  }}>
                  RankOne
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: "0.7rem",
                  }}>
                  EduExamIndia
                </Typography>
              </Box>
            </Box>

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
              gap: 0.5,
              overflowY: "auto",
            }}>
            {menuItems.map(item => (
              <Button
                key={item.path}
                fullWidth
                onClick={() => handleNavigation(item.path)}
                sx={{
                  justifyContent: "flex-start",
                  color: "#334155",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 1.3,
                  px: 1.5,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                    color: "#1976d2",
                  },
                }}>
                {item.label}
              </Button>
            ))}

            <Divider sx={{my: 1.5}} />

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
                py: 1.3,
              }}>
              Student Login
            </Button>

            {/* =================================================
                NEW STUDENT SIGN UP
            ================================================= */}

            <Button
              fullWidth
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => handleNavigation("/student/register")}
              sx={{
                fontWeight: 800,
                textTransform: "none",
                py: 1.3,
                mt: 0.8,
                borderWidth: 2,
                color: "#1976d2",
                borderColor: "#1976d2",

                "&:hover": {
                  borderWidth: 2,
                  borderColor: "#1565c0",
                  backgroundColor: "#eff6ff",
                },
              }}>
              New Student? Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PublicHeader;
