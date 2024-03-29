import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");

  const handleGoBack = async () => navigate(-1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(name, email, password, type);

    try {
      if (name !== "" && email !== "" && password !== "" && type !== "") {
        const response = await axios.post(
          "http://localhost:8080/signup", //ligação à porta do NodeJS
          JSON.stringify({ name, email, password, type }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Credentials sent!");
        // console.log(response);
        if (response.status === 201) {
          alert("User created!");
          navigate("/login");
        }
      } else {
        setMsg("Inputed credentials not valid.");
      }
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 403) {
        alert("User already exists!");
      }
      setMsg(error.message);
    }
  };

  return (
    <div className="signup-container auth-form-container">
      <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button>
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form">
        <div className="inputbox">
          <span>&#10077;</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="inputbox email-inp">
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
        <div className="inputbox">
          <select
            className="select-type"
            id="select-type"
            onChange={(e) => setType(e.target.value)}
          >
            <option>Select type...</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          className="btn-signup btn"
          type="submit"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </button>
      </form>
      {msg && <p className="error"> {msg}</p>}
    </div>
  );
}

export default SignUp;
