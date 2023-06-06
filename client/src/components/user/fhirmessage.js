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

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.UserName;
  const userType = user.UserType;

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
    localStorage.clear();
  };

  const [entry, setEntry] = useState([]);
  useEffect(() => {
    axios.get(baseURL + params.id).then((response) => {
      setEntry(response.data);
    });
  }, [params.id]);

  console.log(JSON.stringify(entry));

  const tableCreator = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        if (value === null) {
          return (
            <tr key={key}>
              <td className={"td_" + key}>{key}</td>
              <td>{tableCreator("null")}</td>
            </tr>
          );
        }
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{tableCreator(value)}</td>
          </tr>
        );
      } else if (Array.isArray(value)) {
        if (value === null) {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <table>
                  <tbody>{tableCreator(undefined)}</tbody>
                </table>
              </td>
            </tr>
          );
        }
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <table>
                <tbody>{tableCreator(value)}</tbody>
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
    <div>
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
        <div className="pacient-form-container auth-form-container">
          <h2 className="pacient-form-title">FHIR Message</h2>
          {entry && entry.fhirMessage && entry.fhirMessage.entry && (
            <table className="fhirTable">
              <tbody>{tableCreator(entry.fhirMessage.entry)}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default FHIRMessage;
