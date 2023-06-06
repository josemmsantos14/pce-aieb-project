import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// o admin vai ter uma tabela com as compositions já submetidas, ou seja, os forms já submetidos
// e tmb as mensagens fhir
// não precisa do form visto que vai só consultar o que já existe

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user_intro = localStorage.getItem("user");

  const baseURL = "http://localhost:8080/adminpage/listFhirMessages";

  const user = JSON.parse(user_intro);
  const userName = user.UserName;
  const userType = user.UserType;

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
    console.log("id: ", id);

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

  const tableCreator = fhirMsgList.map((row) => {
    let date = row.fhirMessage["entry.3.entry.period.end.date"];
    return (
      <tr key={row._id} onClick={(e) => sendinfo(row)}>
        <td>{date}</td>
        <td>
          {row.fhirMessage["entry.2.resource.name.0.text"] +
            " " +
            row.fhirMessage["entry.2.resource.name.0.family"]}
        </td>
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
        <h2 className="navbar-title">
          <span>N</span>
          <span>A</span>
        </h2>
        <ul className="navbar-left-items">
          <li>
            <Link to="/adminpage">Forms</Link>
          </li>
          <li>
            <Link to="/adminpage/graphs">Graphs</Link>
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
            className="btn btn-logout"
          >
            Logout
          </button>
        </div>
      </navbar>
      <div className="body">
        <div className="auth-form-container admin-container">
          <h2 className="admin-title">Notas de Alta</h2>
          <table className="admin-table">
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

export default AdminPage;
