import { useNavigate, useLocation, Link } from "react-router-dom";
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

  const [fhirMsgList, setFhirMsgList] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setFhirMsgList(response.data);
    });
  }, []);

  // console.log(fhirMsgList);

  const sendinfo = async (fhir) => {
    let id = fhir._id;
    let fhirMsg = fhir.fhirMessage;

    const response = await axios.post(
      "http://localhost:8080/adminpage/fhirMessageToComposition", //ligação à porta do NodeJS e ao respetivo caminho relativo ao login
      JSON.stringify({ fhirMsg }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log(response.data);

    if (response.status === 200) {
      let composition = response.data;
      navigate("/adminpage/" + id, {
        state: {
          Composition: composition,
        },
      });
    } else {
      alert("Information not valid!");
    }
  };

  //console.log("FHIR Message: ", fhirMsgList);

  const tableCreater = fhirMsgList.map((row) => {
    return (
      <tr key={row._id} onClick={(e) => sendinfo(row)}>
        <td>{row._id}</td>
        <td>Form</td>
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
          <li>
            <Link to="/adminpage">Forms</Link>
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
