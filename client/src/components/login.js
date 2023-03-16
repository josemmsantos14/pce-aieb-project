import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

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
      <button type="button" onClick={handleGoBack} class="goback">
        &#11164;
      </button>
      <h2>Login</h2>
      <form className="login-form">
        <div class="inputbox">
          <span>&#9993;</span>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          {/* corrigir css que vem para baixo nao tendo email valido */}
        </div>
        <div class="inputbox">
          <span>&#128477;</span>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" onClick={(e) => handleLogin(e)}>
          Log In
        </button>
      </form>
      <footer class="after-form">
        <span>
          <a href="/signup" class="regist">
            Create account
          </a>
        </span>
        <span>
          <a href="/sendemail" class="forgot">
            Forgot my pass
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Login;
