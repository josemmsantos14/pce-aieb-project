import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

function FHIRMessage() {
    const baseURL = "http://localhost:8080/userpage/list/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  const [entry, setEntry] = useState([]);
    useEffect(() => {
        axios.get(baseURL + params.id).then((response) => {
            setEntry(response.data);
        })
    }, [params.id]);

  console.log(JSON.stringify(entry));

  const tableCreater = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{tableCreater(value)}</td>
          </tr>
        );
      } else if (Array.isArray(value)) {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <table>
                <tbody>{tableCreater(value)}</tbody>
              </table>
            </td>
          </tr>
        );
      }
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{JSON.stringify(value)}</td>
        </tr>
      );
    });
  };
  
  return (
    <div className="main-container">
      <navbar className="navbar">
        <ul className="navbar-left-items">
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Help</Link>
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
        <div className="auth-form-container pacient-form-container">
        {entry && entry.fhirMessage && entry.fhirMessage.entry && (
          <table className="fhirTable">
            <thead>
              <th>FHIR Message</th>
            </thead>
            <tbody>{tableCreater(entry.fhirMessage.entry)}</tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
}

export default FHIRMessage;