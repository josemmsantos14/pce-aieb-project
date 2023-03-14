import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post(
        "http://localhost:8080/login", //ligação à porta do NodeJS
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Credentials sent!");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(email, password);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/login", //ligação à porta do NodeJS
  //       JSON.stringify({ email, password }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       setMsg(error.response.data.msg);
  //     }
  //   }
  // };

  const handleLogout = async (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setMsg("");
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleLogin(e)}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
