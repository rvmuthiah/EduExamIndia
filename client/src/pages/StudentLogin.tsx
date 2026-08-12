import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {studentLogin} from "../services/auth.service";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await studentLogin(username.trim(), password);

      console.log("STUDENT LOGIN RESPONSE:", JSON.stringify(response, null, 2));

      if (!response.success || !response.data) {
        alert(response.message || "Student Login Failed");
        return;
      }

      const {
        token,
        studentId,
        username: loggedInUser,
        name,
        role,
      } = response.data;

      // ============================================
      // STORE LOGIN INFORMATION
      // ============================================

      // IMPORTANT:
      // Axios interceptor reads "token"
      localStorage.setItem("token", token);

      localStorage.setItem("studentId", String(studentId));

      localStorage.setItem("username", loggedInUser);

      localStorage.setItem("studentName", name);

      localStorage.setItem("role", role);

      console.log(
        "STUDENT TOKEN SAVED:",
        Boolean(localStorage.getItem("token")),
      );

      console.log("STUDENT ID SAVED:", localStorage.getItem("studentId"));

      console.log("STUDENT ROLE SAVED:", localStorage.getItem("role"));

      alert("Student Login Successful");

      navigate("/student/exams");
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
    <div
      style={{
        padding: "30px",
        maxWidth: "400px",
        margin: "50px auto",
      }}>
      <h2>EduExamIndia Student Login</h2>

      <br />

      <input
        type="text"
        placeholder="Email or Mobile"
        value={username}
        onChange={event => setUsername(event.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button
        type="button"
        onClick={() => void handleLogin()}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
        }}>
        {loading ? "Logging in..." : "Student Login"}
      </button>
    </div>
  );
};

export default StudentLogin;
