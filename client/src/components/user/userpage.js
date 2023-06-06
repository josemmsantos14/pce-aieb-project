import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

// o user vai ter o form para preencher e tmb terá de ter acesso a uma tabela com todas as compositions guardadas na base de dados

import { Form } from "protected-aidaforms";
import { CLIENT_LOCAL_FILES } from "mysql/lib/protocol/constants/client";

let json = require("../../jdt_notas_alta.json");
let style = require("../../style_notas_alta.json");

function UserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [composition, setComposition] = React.useState("");

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

  // função que faz comunicação react-node para adicionar composition
  const handleAdd = async (values, changedFields) => {
    console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields);

    // setComposition(values);

    try {
      const response = await axios.post(
        "http://localhost:8080/userpage/new-composition", //ligação à porta do NodeJS e ao respetivo caminho correspondente à acção de post de uma nova composition
        JSON.stringify({ composition: values }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("Composition added!");
      }
    } catch (error) {
      console.error(error.response.status);
      if (error.response.status === 400) {
        alert("Composition not added! Something went wrong.");
      }
    }
  };

  // const formRef = React.useRef();

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
      {/* <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button> */}
      {/* <h2>Hello User!</h2> */}

      <div className="body">
        <Form
          className="form-principal"
          onSubmit={(values, changedFields) => handleAdd(values, changedFields)}
          onSave={(values, changedFields) =>
            console.log(
              "SAVED VALUES: ",
              values,
              "CHANGED FIELDS: ",
              changedFields
            )
          }
          onCancel={(status) => console.log("CANCELLED:", status)}
          template={json}
          dlm={{}}
          showPrint={true}
          editMode={true}
          professionalTasks={[
            "Registar Pedido",
            "Consultar Pedido",
            "Anular Pedido",
          ]}
          canSubmit={true}
          canSave={true}
          canCancel={true}
          submitButtonDisabled={false}
          saveButtonDisabled={false}
          formDesign={JSON.stringify(style)}
        />
      </div>
    </div>
  );
}

export default UserPage;

/*  patientData={{
          numSequencial: 1904865,
          episodio: 21016848,
          modulo: "INT",
          processo: 99998888,
          nome: "Manuel Utente Teste Teste Teste",
          dtaNascimento: "1945-08-15",
          idade: 77,
          sexo: "Masculino",
        }}
        reportData={{
          dtaEncerrada: "22-05-2019 13:02",
          dtaCriada: "10-05-2019 18:47",
          realizada: "Joana Pascoal",
          responsavel: "José Costa",
        }}
        referenceModel={[
          {
            itemName: "Número mecanográfico",
            item: "num_mecanografico",
            value: "123456",
            formVisible: true,
          },
          {
            itemName: "Número sequencial",
            item: "num_seq",
            value: 1347095,
            formVisible: true,
          },
          {
            itemName: "Nome",
            item: "Nome",
            value: "José da Silva Pinto",
            formVisible: true,
          },
        ]} */
