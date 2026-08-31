import {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const StudentLayout = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ============================================
  // STUDENT INFORMATION
  // ============================================

  const studentName = localStorage.getItem("studentName") || "Student";

  const username = localStorage.getItem("username") || "";

  // ============================================
  // PROFILE MENU
  // ============================================

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    localStorage.removeItem("username");
    localStorage.removeItem("studentName");
    localStorage.removeItem("role");

    setAnchorEl(null);

    navigate("/student/login");
  };

  // ============================================
  // PROFILE
  // ============================================

  const handleProfile = () => {
    setAnchorEl(null);

    navigate("/student/profile");
  };

  // ============================================
  // NAVIGATION
  // ============================================

  const goToDashboard = () => {
    navigate("/student/dashboard");
  };

  const goToExams = () => {
    navigate("/student/exams");
  };

  const goToResults = () => {
    navigate("/student/results");
  };

  const goToLeaderboard = () => {
    navigate("/student/leaderboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}>
      {/* =================================================
          HEADER
      ================================================= */}

      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: "#1976d2",
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}>
          {/* =================================================
              LOGO
          ================================================= */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              flexShrink: 0,
            }}
            onClick={goToDashboard}>
            <SchoolIcon />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
              }}>
              RankOne
            </Typography>
          </Box>

          {/* =================================================
              MAIN NAVIGATION
          ================================================= */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 0.5,
            }}>
            <Button
              startIcon={<DashboardIcon />}
              onClick={goToDashboard}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
              }}>
              Dashboard
            </Button>

            <Button
              startIcon={<QuizIcon />}
              onClick={goToExams}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
              }}>
              Exams
            </Button>

            <Button
              startIcon={<AssessmentIcon />}
              onClick={goToResults}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
              }}>
              Results
            </Button>

            <Button
              startIcon={<EmojiEventsIcon />}
              onClick={goToLeaderboard}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
              }}>
              Leaderboard
            </Button>
          </Box>

          {/* =================================================
              STUDENT
          ================================================= */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}>
            {/* STUDENT NAME */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                textAlign: "right",
                mr: 1,
              }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}>
                {studentName}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  opacity: 0.85,
                }}>
                {username}
              </Typography>
            </Box>

            {/* AVATAR */}

            <Button
              onClick={handleMenuOpen}
              sx={{
                minWidth: 0,
                p: 0.5,
                color: "white",
                borderRadius: 50,
              }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  color: "#1976d2",
                }}>
                {studentName.charAt(0).toUpperCase()}
              </Avatar>
            </Button>

            {/* =================================================
                PROFILE MENU
            ================================================= */}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  goToDashboard();
                }}>
                <DashboardIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  goToExams();
                }}>
                <QuizIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                My Exams
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  goToResults();
                }}>
                <AssessmentIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                My Results
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  goToLeaderboard();
                }}>
                <EmojiEventsIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                Leaderboard
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleProfile}>
                <PersonIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                My Profile
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <LogoutIcon
                  fontSize="small"
                  sx={{mr: 1}}
                />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      <Box
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          px: 1,
          py: 1,
          gap: 1,
          overflowX: "auto",
        }}>
        <Button
          startIcon={<DashboardIcon />}
          onClick={goToDashboard}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
          Dashboard
        </Button>

        <Button
          startIcon={<QuizIcon />}
          onClick={goToExams}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
          Exams
        </Button>

        <Button
          startIcon={<AssessmentIcon />}
          onClick={goToResults}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
          Results
        </Button>

        <Button
          startIcon={<EmojiEventsIcon />}
          onClick={goToLeaderboard}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
          Leaderboard
        </Button>
      </Box>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <Box
        sx={{
          p: {
            xs: 1,
            sm: 2,
            md: 3,
          },
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentLayout;
