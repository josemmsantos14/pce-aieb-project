import React from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../../replace_values_jdt";
let json = require("../../jdt_notas_alta.json");
let style = require("../../style_notas_alta.json");

function PacientForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const composition = location.state.Composition;

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.UserName;
  const userType = user.UserType;

  console.log("COMPOSITION: ", composition);

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
    localStorage.clear();
  };

  let new_jdt = replaceValuesJDT(json, composition);
  console.log("NEW JDT: ", new_jdt);

  return (
    <div>
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
            className="btn-logout btn "
          >
            Logout
          </button>
        </div>
      </navbar>

      <div className="body">
        <Form
          className="form-principal"
          onSubmit={(values, changedFields) =>
            console.log(
              "SAVED VALUES: ",
              values,
              "CHANGED FIELDS: ",
              changedFields
            )
          }
          onSave={(values, changedFields) =>
            console.log(
              "SAVED VALUES: ",
              values,
              "CHANGED FIELDS: ",
              changedFields
            )
          }
          onCancel={(status) => console.log("CANCELLED:", status)}
          template={new_jdt}
          dlm={{}}
          showPrint={true}
          editMode={false}
          professionalTasks={[
            "Registar Pedido",
            "Consultar Pedido",
            "Anular Pedido",
          ]}
          canSubmit={false}
          canSave={false}
          canCancel={false}
          submitButtonDisabled={true}
          saveButtonDisabled={true}
          formDesign={JSON.stringify(style)}
        />
      </div>
    </div>
  );
}

export default PacientForm;
