import { useState } from "react";
import { redirect, useNavigate, useLocation } from "react-router";

// o admin vai ter uma tabela com as compositions já submetidas, ou seja, os forms já submetidos
// e tmb as mensagens fhir
// não precisa do form visto que vai só consultar o que já existe

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  return (
    <div className="main-container">
      <navbar className="navbar">
        <ul className="navbar-left-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
        </ul>
        <div className="navbar-right-items">
          <div className="user-creds">
            <h5 className="user-name">{location.state.user.UserName}</h5>
            <h5 className="user-type">{location.state.user.UserType}</h5>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Logout
          </button>
        </div>
      </navbar>
      <div className="App">
        <div className="auth-form-container admin-container">
          <h2>Notas de Alta</h2>
          <table>
            <thead>
              <tr>
                <th>Entry</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/* {[1, 2, 3, 4, 5].map((object, i) => (
                <ObjectRow obj={object} key={i} />
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
