var express = require("express");
var router = express.Router();
var CompositionController = require("../controller/composition.js");

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


// função post no node para adicionar à base de dados a composition submetida pelo user na página
router.post("/new-composition", async (req, res) => {
  let { composition } = req.body;

  //----------------- Criação da mensagem FHIR -----------------
  const fhirMessage = require("../notas_alta_fhir_2.json");
  // console.log("MENSAGEM FHIR ORIGINAL: ", fhirMessage); // campos da mensagem fhir
  composition = JSON.parse(composition)
  // console.log(composition)

  // ALTERAÇÃO DA COMPOSITION PARA O ASPETO PRETENDIDO -> para ser mais fácil a criação da mensagem fhir
  let new_composition = {}
  
  for (const [key, value] of Object.entries(composition)) {
    let text = "";
    try {
      new_composition[key] = JSON.parse(`${value}`);
      
      // AINDA NÃO FUNCIONA // caso dos blocks, para juntar o texto se tiver mais que 1 linha
      // for (let i = 0; i < value["blocks"].length; i++) {
      //   text = text + "\n" + value["blocks"][`${i}`]["text"];
      // }
      // new_composition[key] = text;
    }
    catch {
      new_composition[key] = composition[key];
    }
    
  }

  //console.log("NOVA COMPOSITION: ", new_composition)

  const keysComposition = getAllKeys(new_composition); // keys da composition
  const valuesFhir = addAllValues(fhirMessage); // values da mensagem fhir

  for (var key of keysComposition) {
    for (var value of valuesFhir) {
      if (key === value) {
        //fhirKey = Object.keys(fhirMessage).find(key => fhirMessage[key] === value)
        fhirKey = getKeysByValue(fhirMessage, value)
        //console.log(fhirKey)
        fhirMessage[fhirKey] = new_composition[key]
        //console.log("NEW VALUE: ", fhirMessage[fhirKey])
      }
    }
  }

  //console.log("FHIR MESSAGE: ", fhirMessage);
  // -----------------------------------------------------------
  
  // console.log("COMPOSITION!!!!!!!!", composition);
  // console.log("FHIR!!!!!!!!", fhirMessage);
  const compositionResponse = await CompositionController.newComposition(composition, fhirMessage);
  // console.log(compositionResponse);
  if (!compositionResponse.success) {
    return res.status(400).json({ response: compositionResponse.response });
  } else {
    return res.status(200).json({ response: compositionResponse.response });
  }
});

router.get("/list", async (req, res) => {
  const compositionResponse = await CompositionController.listCompositions();
  res.status(200).json(compositionResponse.response)
});

router.get("/list/:id", async (req, res) => {
  const compositionResponse = await CompositionController.findCompositionByID(req.params.id);
  res.status(200).json(compositionResponse.response);
});

module.exports = router;
