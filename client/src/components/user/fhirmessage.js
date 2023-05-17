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

    console.log(entry);


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
          <p className="id">ID: {params.id}</p>
          {entry && entry.fhirMessage && (
                <div>
                {Object.keys(entry.fhirMessage).map((key) => (
                    <p key={key}>{`${key}: ${JSON.stringify(entry.fhirMessage[key])}`}</p>
                ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default FHIRMessage;