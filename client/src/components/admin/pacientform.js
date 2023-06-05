import React from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../../replace_values_jdt";
let json = require("../../jdt_notas_alta.json");
let style = require("../../style_notas_alta.json");


function PacientForm() {
  // const baseURL = "http://localhost:8080/adminpage/listFhirMessages";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const composition = location.state.Composition;

  console.log("COMPOSITION: ", composition)

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  // const [entry, setEntry] = useState([]);
  // useEffect(() => {
  //   axios.get(baseURL + params.id).then((response) => {
  //     setEntry(response.data);
  //   });
  // }, [params.id]);

  // console.log("entry: " + entry);

  let new_jdt = replaceValuesJDT(json, composition);
  console.log("NEW JDT: ", new_jdt)

  

  return (
    <div>
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
            <Link to="#">Forms</Link>
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
      {/* <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button> */}
      {/* <h2>Hello User!</h2> */}

      <div className="body">
        <h1>Olá!</h1>
        {/* <Form
          className="form-principal"
          template={new_jdt}
          dlm={{}}
          showPrint={true}
          editMode={false}
          // professionalTasks={[
          //   "Registar Pedido",
          //   "Consultar Pedido",
          //   "Anular Pedido",
          // ]}
          canSubmit={false}
          canSave={false}
          canCancel={true}
          submitButtonDisabled={true}
          saveButtonDisabled={true}
          formDesign={JSON.stringify(style)}
        /> */}

<Form
          className="form-principal"
          onSubmit={(values, changedFields) => console.log("SAVED VALUES: ",
          values,
          "CHANGED FIELDS: ",
          changedFields)}
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
          editMode={true}
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
