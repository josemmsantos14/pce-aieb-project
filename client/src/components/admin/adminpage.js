import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

// o admin vai ter uma tabela com as compositions já submetidas, ou seja, os forms já submetidos
// e tmb as mensagens fhir
// não precisa do form visto que vai só consultar o que já existe

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  let data = [
    { id: 123, name: "Anom", age: 19 },
    { id: 456, name: "Megha", age: 19 },
    { id: 789, name: "Subham", age: 25 },
    { id: 321, name: "Jose", age: 24 },
    { id: 654, name: "Santos", age: 30 },
  ];

  const tableCreater = data.map((val, key) => {
    return (
      <tr key={key}>
        <Link to={{ pathname: "/adminpage/" + val.id, state: user }}>
          <td>{val.name}</td>
          <td>{val.age}</td>
        </Link>
      </tr>
    );
  });

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
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Help</Link>
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
      <div className="body">
        <div className="auth-form-container admin-container">
          <h2 className="admin-title">Notas de Alta</h2>
          <table>
            <thead>
              <tr>
                <th>Entry</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{tableCreater}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
