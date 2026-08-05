import {AppBar, Toolbar, Typography, Box} from "@mui/material";

const AdminHeader = () => {
  const username = localStorage.getItem("username");

  return (
    <AppBar
      position="static"
      sx={{
        background: "#1976d2",
      }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{flexGrow: 1}}>
          EduExamIndia Admin Panel
        </Typography>

        <Box>Welcome {username}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
