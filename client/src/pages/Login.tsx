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
      // const response = await login(username, password);

      // localStorage.setItem("token", response.data.data.token);

      // localStorage.setItem("username", response.data.data.username);

      // alert("Login Successful");

      // navigate("/dashboard");

      const response = await login(username, password);

      
      console.log(response);

      const {token, username: loggedInUser} = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUser);

        alert("Login Successful");

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);

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
