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
      keys.push(key);
      if (typeof obj[key] === "object") {
        keys = keys.concat(
          getAllKeys(obj[key]).map((subKey) => `${key}.${subKey}`)
        );
    }
  }
  return keys;
}

const findAndReplaceValue = (obj, targetValue, newValue) => {
  for (let key in obj) {
      const value = obj[key];

      if (value === targetValue) {
        obj[key] = newValue;
      } else if (typeof value === 'object') {
        findAndReplaceValue(value, targetValue, newValue); 
      }
    }
};

function getKeysByValue(obj, value) {
  let keys = [];
  for (let key in obj) {
      if (obj[key] === value) {
        keys.push(key);
      } else if (typeof obj[key] === "object") {
        keys = keys.concat(
          getKeysByValue(obj[key], value).map((subKey) => `${key}.${subKey}`)
        );
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
    // console.log([key, value])

    if (Array.isArray(value)) {
      console.log("value: ", value)
      
      for (let obj of value) {
        console.log("obj: ", obj)
        
        if (obj.value) {
          console.log("campo value do obj? ", obj.value)
          try {
            obj.value = JSON.parse(`${obj.value}`);
            console.log("alteração para objeto? ", obj.value)
            
            obj.value = obj.value["blocks"][0]["text"]
            console.log("texto? ", obj.value)
          
            // for (let i = 0; i < obj.value["blocks"].length; i++) {
            //   text1 = text1 + "\n" + obj.value["blocks"][`${i}`]["text"];
            // }
            // obj.value = text1

          }
          catch {
            obj.value = obj.value
          }
        }

        if (obj.values) {
          // obj.values = JSON.parse(`${obj.values}`);
          for (const [key1, value1] of Object.entries(obj.values)) {
            console.log("val of obj.values: ", value1)
            try {
              obj.values[key1] = JSON.parse(`${value1}`);

              obj.values[key1] = obj.values[key1]["blocks"][0]["text"]
              console.log("texto? ", obj.values[key1])

              // for (let i = 0; i < value1["blocks"].length; i++) {
              //   text2 = text2 + "\n" + value1["blocks"][`${i}`]["text"];
              // }
  
              // obj.values[key1] = text2
            }
            catch {
              obj.values[key1] = value1
            }
          }
          console.log("alteração? ", obj.values)
        }
      }
      new_composition[key] = value
    }
    else {
      let text = "";

      try {
        new_composition[key] = JSON.parse(`${value}`);

        if (new_composition[key]) {
          for (let i = 0; i < new_composition[key]["blocks"].length; i++) {
            text = text + "\n" + new_composition[key]["blocks"][`${i}`]["text"];
          }
          new_composition[key] = text;
        }
      }

      catch {
        new_composition[key] = composition[key];
      }
    }
  }
    

  console.log("NOVA COMPOSITION: ", new_composition)

  const keysComposition = getAllKeys(new_composition); // keys da composition
  const valuesFhir = addAllValues(fhirMessage); // values da mensagem fhir

  for (var key of keysComposition) {
    for (var value of valuesFhir) {
      if (key === value) {
        //fhirKey = Object.keys(fhirMessage).find(key => fhirMessage[key] === value)
        fhirKey = getKeysByValue(fhirMessage, value)
        console.log(fhirKey)
        fhirMessage[fhirKey] = new_composition[key] // cria nova entrada
        findAndReplaceValue(fhirMessage, value, new_composition[key]) // substitui valor na entry formato json
        console.log("NEW VALUE: ", fhirMessage[fhirKey])
      }
    }
  }

  console.log("FHIR MESSAGE: ", fhirMessage);

  // -----------------------------------------------------------
  
  
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
