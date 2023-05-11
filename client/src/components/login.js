import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      if (email !== "" && password !== "") {
        const response = await axios.post(
          "http://localhost:8080/login", //ligação à porta do NodeJS e ao respetivo caminho relativo ao login
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        let user = response.data.body;
        console.log(user);

        // console.log("Credentials sent!");
        if (user.response.UserType === "admin") {
          navigate("/adminpage");
        } else {
          navigate("/userpage");
        }
      } else {
        setMsg("Please input valid credentials.");
      }
    } catch (error) {
      if (error.response.status === 204) {
        console.error(error.message);
        setMsg(error.message);
      } else if (error.response.status === 401) {
        console.error(error.message);
        setMsg(error.response.data);
      } else if (error.response.status === 500) {
        console.error(error.message);
        setMsg(error.message);
      } else {
        setMsg("Internal error ocurred!");
      }
    }
  };

  return (
    <div className="auth-form-container">
      <button type="button" onClick={handleGoBack} class="goback">
        &#11164;
      </button>
      <div>
        <h2>Login</h2>
        <form className="login-form">
          <div className="inputbox">
            <span>&#9993;</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            {/* corrigir css que vem para baixo nao tendo email valido */}
          </div>
          <div className="inputbox">
            <span>&#128477;</span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            class="btn-login"
            onClick={(e) => handleLogin(e)}
          >
            Log In
          </button>
        </form>
        <footer className="after-form">
          <span>
            <a href="/signup" className="regist">
              Create account
            </a>
          </span>
          <span>
            <a href="/sendemail" className="forgot">
              Forgot my pass
            </a>
          </span>
        </footer>
        {msg && <p className="error"> {msg} </p>}
      </div>
    </div>
  );
}

export default Login;
