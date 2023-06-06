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

  const [formsList, setFormsList] = useState([]);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setFormsList(response.data);
        })
    }, []);

  const tableCreater = formsList.map((row) => {
    return (
      <tr key={row._id}>
        <Link to={"/userpage/" + row._id}>
          <td>{row._id}</td>
          <td>FHIR Message</td>
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
            <Link to="/userpage">Form</Link>
          </li>
          <li>
            <Link to="/userpage/forms">FHIR messages</Link>
          </li>
        </ul>
        <div className="navbar-right-items">
          {/* <div className="user-creds">
            <h5 className="user-name">{location.state.user.UserName}</h5>
            <h5 className="user-type">{location.state.user.UserType}</h5>
          </div> */}
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

export default UserForms;
