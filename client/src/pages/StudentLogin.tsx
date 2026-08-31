import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";

//import {studentLogin} from "../services/student.service";
import {studentLogin} from "../services/auth.service";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter email/mobile and password");
      return;
    }

    try {
      setLoading(true);

      console.log("STUDENT LOGIN STARTED");

      const response = await studentLogin(username.trim(), password);

      console.log("STUDENT LOGIN RESPONSE:", response);

      if (!response.success || !response.data) {
        alert(response.message || "Student Login Failed");
        return;
      }

      const {
        token,
        studentId,
        username: loggedInUsername,
        name,
        role,
      } = response.data;

      // ============================================
      // SAVE LOGIN INFORMATION
      // ============================================

      localStorage.setItem("token", token);

      localStorage.setItem("studentId", String(studentId));

      localStorage.setItem("username", loggedInUsername);

      localStorage.setItem("studentName", name);

      localStorage.setItem("role", role);

      console.log("TOKEN SAVED:", Boolean(localStorage.getItem("token")));

      console.log("STUDENT ID:", localStorage.getItem("studentId"));

      console.log("STUDENT ROLE:", localStorage.getItem("role"));

      alert("Student Login Successful");

      // Go to Student Exam page
      navigate("/student/dashboard");
    } catch (error: unknown) {
      console.error("STUDENT LOGIN ERROR:", error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Student Login Failed");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
      }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
        }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{textAlign: "center"}}>
          Student Login
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            textAlign: "center",
          }}>
          Login using your Email or Mobile Number
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <TextField
            fullWidth
            label="Email or Mobile"
            placeholder="Enter email or mobile"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => void handleLogin()}
            disabled={loading}>
            {loading ? "Logging in..." : "Student Login"}
          </Button>

          <Button
            variant="text"
            onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentLogin;
