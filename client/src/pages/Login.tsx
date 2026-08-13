import {useState} from "react";
import {login} from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      console.log("ADMIN LOGIN RESPONSE:", response.data);

      const {token, username: loggedInUser} = response.data;

      // Clear any old student authentication
      localStorage.removeItem("studentId");

      // Store admin authentication consistently
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUser);
      localStorage.setItem("role", "Admin");

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("ADMIN LOGIN ERROR:", error);

      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "Login Failed");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div style={{padding: "30px"}}>
      <h2>EduExamIndia Admin Login</h2>

      <br />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
