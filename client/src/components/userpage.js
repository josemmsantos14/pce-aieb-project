import * as React from "react";
import { useState } from "react";
import { redirect, useNavigate, useLocation } from "react-router";
import axios from "axios";

// o user vai ter o form para preencher e tmb terá de ter acesso a uma tabela com todas as compositions guardadas na base de dados

import { Form } from "protected-aidaforms";

let json = require("../jdt_notas_alta.json");
let style = require("../style_notas_alta.json");

// ----------------------- Para criação da mensagem Fhir -----------------------
let values_extracted = [];
let keys = [];
function addAllValues(fieldMapping) {
  for (const field in fieldMapping) {
    if (typeof fieldMapping[field] === "object") {
      addAllValues(fieldMapping[field]);
    } else {
      values_extracted.push(fieldMapping[field]);
    }
  }

  return values_extracted;
}

function getAllKeys(obj) {
  let keys = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
      if (typeof obj[key] === "object") {
        keys = keys.concat(
          getAllKeys(obj[key]).map((subKey) => `${key}.${subKey}`)
        );
      }
    }
  }
  return keys;
}

function getKeysByValue(obj, value) {
  let keys = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === value) {
        keys.push(key);
      } else if (typeof obj[key] === "object") {
        keys = keys.concat(
          getKeysByValue(obj[key], value).map((subKey) => `${key}.${subKey}`)
        );
      }
    }
  }
  return keys;
}
// ----------------------------------------------

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

    // //------------------- Criação da mensagem fhir com os campos do form -------------------
    // const fhirMessage = require("../notas_alta_fhir_2.json");
    // //console.log(fhirMessage); // campos da mensagem fhir

    // const form = JSON.parse(values);
    // const keysForm = getAllKeys(form); // keys do form
    // const valuesFhir = addAllValues(fhirMessage); // values da mensagem fhir


    // for (const value in valuesFhir) {
    //   for (const item in keysForm) {
    //     if (valuesFhir[value] === keysForm[item]) {
    //       let text = "";
    //       // console.log(values_extracted[value]);
    //       let key = getKeysByValue(fhirMessage, valuesFhir[value]); // keys do fhir
    //       console.log(item)
    //       console.log(keysForm[item])
    //       console.log("item: ", form[keysForm[item]])
    //       console.log("tipo do item: ", typeof form[keysForm[item]])

    //       try {
    //         let parse = JSON.parse(form[keysForm[item]])
    //         console.log("parse: ",parse)
            
    //         // caso dos blocks, em que é necessário fazer parse para voltar a ser um objeto JSON
    //         if (parse) {
    //           for (let i = 0; i < parse["blocks"].length; i++) {
    //             text = text + "\n" + parse["blocks"][`${i}`]["text"];
    //           }
    //           fhirMessage[key] = text; // substituição na mensagem no caso de se tratar de um objeto blocks
    //         }

    //         else if (!parse){
    //           console.log("tenho parse nulo")
    //         }

    //         // // restantes casos em que os elementos já são objetos
    //         // else if (!parse){
    //         //   // fhirMessage[key] = form[keysForm[item]];
    //         //   // caso dos participants
    //         //   if (fhirMessage[key].type) {
    //         //     fhirMessage[key].code = form[keysForm[item]].code;
    //         //     fhirMessage[key].display = form[keysForm[item]].text;
    //         //   }
    //         //   // caso dos practitioners
    //         //   else if (typeof fhirMessage[key] === 'array') {
    //         //     console.log("entrei aqui, sou um array!!!")
    //         //   }
    //         //   // caso dos identifiers
    //         //   // else if (fhirMessage[key].value) {
    //         //   //   // console.log("entrei aqui?")
    //         //   //   fhirMessage[key].value = form[keysForm[item]]["0"]["value"];
    //         //   // }
                
    //         // }
    //         // else {
    //         //   // caso dos coded text
    //         //   if (fhirMessage[key].code) {
    //         //     console.log(fhirMessage[key].length)
    //         //     for (let j = 0; j < fhirMessage[key].length; j++) {
    //         //       fhirMessage[key].code.push(form[keysForm[item]][`${j}`].code);
    //         //       fhirMessage[key].display.push(form[keysForm[item]][`${j}`].text);
    //         //       // text = text + "\n" + parse["blocks"][`${i}`]["text"];
    //         //     }
    //         //     console.log("entrei aqui, sou um array!!!", fhirMessage[key])
    //         //   }
    //         // }
    //       } catch {
    //         // elementos já são OBJETOS
    //         console.log("não tenho parse??")
    //       }

    //       console.log("value na msg fhir: ", fhirMessage[key])

    //       // ainda não funciona:
    //       // - não há divisão das keys do form em code e display (eg. aparece items.0.0.items.0.items.2.items.4.value quando devia aparecer items.0.0.items.0.items.2.items.4.value.code e items.0.0.items.0.items.2.items.4.value.text)
    //       // - não é possivel chegar ao campo text quando o value do form é um objeto
    //     }
    //   }
    // }
    // console.log(fhirMessage);
    //------------------- Fim da criação da mensagem fhir -------------------

    let fhirMessage = "";
    try {
      const response = await axios.post(
        "http://localhost:8080/userpage/new-composition", //ligação à porta do NodeJS e ao respetivo caminho correspondente à acção de post de uma nova composition
        JSON.stringify({ composition, fhirMessage }),
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
