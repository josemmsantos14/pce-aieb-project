import { useState } from "react";
import { redirect, useNavigate } from "react-router";


// o admin vai ter uma tabela com as compositions já submetidas, ou seja, os forms já submetidos
// e tmb as mensagens fhir
// não precisa do form visto que vai só consultar o que já existe


function AdminPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleGoBack = async () => navigate(-1);

    const handleLogout = async () => {
        setEmail("");
        setPassword("")
        setMsg("");
        navigate("/login");
    }

    return (
        <div className="auth-form-container">
            <button type="button" onClick={handleGoBack} class="goback">
            &#11164;
            </button>
            <h2>Hello Admin!</h2>
            <button type="button"
                  onClick={handleLogout} class="logout">Logout</button>
        </div>
      );
};

export default AdminPage;