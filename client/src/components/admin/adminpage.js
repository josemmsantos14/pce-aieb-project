import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// o admin vai ter uma tabela com as compositions já submetidas, ou seja, os forms já submetidos
// e tmb as mensagens fhir
// não precisa do form visto que vai só consultar o que já existe


function AdminPage() {
  const baseURL = "http://localhost:8080/adminpage/listFhirMessages";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  const [fhirMsgList, setFhirMsgList] = useState([]);
  useEffect(() => {
      axios.get(baseURL).then((response) => {
        setFhirMsgList(response.data);
      })
  }, []);

  //console.log("FHIR Message: ", fhirMsgList);

  const tableCreater = fhirMsgList.map((row) => {
    return (
      <tr key={row._id}>
        <Link to={"/adminpage/" + row._id}>
          <td>{row._id}</td>
          <td>Composition</td>
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
