import * as React from "react";
import { useState } from "react";
import { redirect, useNavigate, useLocation } from "react-router";
import axios from "axios";

// o user vai ter o form para preencher e tmb terá de ter acesso a uma tabela com todas as compositions guardadas na base de dados

import { Form } from "protected-aidaforms";

let json = require("../jdt_notas_alta.json");
let style = require("../style_notas_alta.json");


function UserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = async () => navigate(-1);

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  const [composition, setComposition] = React.useState("");

  // função que faz comunicação react-node para adicionar composition
  const handleAdd = async (values, changedFields) => {
    setComposition(values);

    console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields);

    try {
      const response = await axios.post(
        "http://localhost:8080/userpage/new-composition", //ligação à porta do NodeJS e ao respetivo caminho correspondente à acção de post de uma nova composition
        JSON.stringify({ composition }),
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
        <ul className="navbar-left-items">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
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
      {/* <button type="button" onClick={handleGoBack} className="goback">
        &#11164;
      </button> */}
      {/* <h2>Hello User!</h2> */}

      <div className="App">
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
