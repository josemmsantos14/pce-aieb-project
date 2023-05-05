import { useState } from "react";
import { redirect, useNavigate } from "react-router";

import { Form } from "protected-aidaforms";

let json = require("../jdt_notas_alta.json");
let style_json = require("../style_notas_alta.json")

function UserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleGoBack = async () => navigate(-1);

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
  };

  return (
    <div>
        <div className="auth-form-container">
        <button type="button" onClick={handleGoBack} class="goback">
          &#11164;
        </button>
        {/* <h2>Hello User!</h2> */}
        <button type="button" onClick={handleLogout} class="logout">
          Logout
        </button>
      </div>

      <div className="App">
      <Form
        onSubmit={(values, changedFields) =>
          console.log(
            "SUBMITTED VALUES: ",
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
        submitButtonDisabled={false}
        saveButtonDisabled={false}
      />
      </div>
    </div>
    
  );
}

export default UserPage;
