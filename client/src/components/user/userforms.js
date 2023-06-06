import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

function UserForms() {
  const baseURL = "http://localhost:8080/userpage/list";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.UserName;
  const userType = user.UserType;

  const [formsList, setFormsList] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setFormsList(response.data);
    });
  }, []);

  const tableCreator = formsList.map((row) => {
    let date = row.fhirMessage["entry.3.entry.period.end.date"];
    return (
      <tr key={row._id}>
        <Link to={"/userpage/" + row._id}>
          <td>{date}</td>
          <td>
            {row.fhirMessage["entry.2.resource.name.0.text"] +
              " " +
              row.fhirMessage["entry.2.resource.name.0.family"]}
          </td>
        </Link>
      </tr>
    );
  });

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="main-container">
      <navbar className="navbar">
        <h2 className="navbar-title">NA</h2>
        <ul className="navbar-left-items">
          <li>
            <Link to="/userpage">Form</Link>
          </li>
          <li>
            <Link to="/userpage/forms">FHIR Messages</Link>
          </li>
        </ul>
        <div className="navbar-right-items">
          <div className="user-creds">
            <h5 className="user-name">{userName}</h5>
            <h5 className="user-type">{userType}</h5>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-logout btn"
          >
            Logout
          </button>
        </div>
      </navbar>
      <div className="body">
        <div className="auth-form-container admin-container">
          <h2 className="admin-title">Notas de Alta</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Data de Alta</th>
                <th>Nome do Paciente</th>
              </tr>
            </thead>
            <tbody>{tableCreator}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserForms;
