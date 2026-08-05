import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {useNavigate, useLocation} from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DescriptionIcon from "@mui/icons-material/Description";

const drawerWidth = 240;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#0F172A",
          color: "#fff",
        },
      }}>
      <Toolbar />

      <List>
        <ListItemButton
          selected={location.pathname.startsWith("/dashboard")}
          onClick={() => navigate("/dashboard")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/students")}
          onClick={() => navigate("/students")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/questionpapers")}
          onClick={() => navigate("/questionpapers")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Question Papers" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/questions")}
          onClick={() => navigate("/questions")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/exams")}
          onClick={() => navigate("/exams")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Exams" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/leaderboard")}
          onClick={() => navigate("/leaderboard")}>
          <ListItemIcon sx={{color: "#fff"}}>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
