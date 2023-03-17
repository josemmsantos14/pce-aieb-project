import { useState } from "react";
import { redirect, useNavigate } from "react-router";

function UserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleGoBack = async () => navigate(-1);

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  return (
    <div className="auth-form-container">
      <button type="button" onClick={handleGoBack} class="goback">
        &#11164;
      </button>
      <h2>Hello User!</h2>
      <button type="button" onClick={handleLogout} class="logout">
        Logout
      </button>
    </div>
  );
}

export default UserPage;
