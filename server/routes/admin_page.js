var express = require("express");
var router = express.Router();
var userCreds = require("./signup");
var users = userCreds.users;
var CompositionController = require("../controller/composition.js");

router.get("/listFhirMessages", async (req, res) => {
  const fhirResponse = await CompositionController.listFhirMessages();
  //console.log(fhirResponse);
  res.status(200).json(fhirResponse.response);
});

router.get("/listFhirMessage/:id", async (req, res) => {
  const fhirResponse = await CompositionController.listFhirMessageByID(
    req.params.id
  );
  res.status(200).json(fhirResponse.response);
});

router.post("/fhirMessageToComposition", async (req, res) => {
  let fhirMsg = req.body.fhirMsg;
  // fhirMsg = JSON.parse(fhirMsg); 
  // console.log("fhir: " + fhirMsg);
  let comp = fhirToComposition(fhirMsg);
  res.status(200).json(comp);
});


// ----------------------- Funções para criação da composition a preencher o form -----------------------
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


// ----------------------- Para criação da Composition pela mensagem Fhir -----------------------
function fhirToComposition(fhirMessage) {
  let composition = {
    "items.0.0.items.0.items.0.value": {
      code: "entry.2.resource.gender.code",
      text: "entry.2.resource.gender.text",
    },
    "items.0.0.items.0.items.1.items.0.value": "entry.2.resource.name.0.text",
    "items.0.0.items.0.items.1.items.1.value": "entry.2.resource.name.0.family",
    "items.0.0.items.0.items.2.items.0.value":
      "entry.2.resource.address.0.text",
    "items.0.0.items.0.items.2.items.1.value":
      "entry.2.resource.address.0.city",
    "items.0.0.items.0.items.2.items.2.value":
      "entry.2.resource.address.0.district",
    "items.0.0.items.0.items.2.items.3.value":
      "entry.2.resource.address.0.postalcode",
    "items.0.0.items.0.items.2.items.4.value":
      "entry.2.resource.address.0.country",
    "items.0.1.items.0.value":
      "entry.3.entry.id,entry.3.entry.identifier.0.value",
    "items.0.1.items.1.value.date": "entry.3.entry.period.start.date",
    "items.0.1.items.1.value.time": "entry.3.entry.period.start.time",
    "items.0.1.items.2.value": "entry.3.entry.reason",
    "items.0.1.items.3.items.0.value": "entry.3.entry.participant.name",
    "items.0.1.items.3.items.1.value": [
      {
        code: "entry.3.entry.participant.type.code",
        text: "entry.3.entry.participant.type.display",
      },
    ],
    "items.0.1.items.4.value.date": "entry.3.entry.period.end.date",
    "items.0.1.items.4.value.time": "entry.3.entry.period.end.time",
    "items.0.1.items.5.value": {
      code: "entry.3.entry.hospitalization.dischargeDisposition.code",
      text: "entry.3.entry.hospitalization.dischargeDisposition.display",
    },
    "items.0.1.items.6.items.0.value": "entry.4.name",
    "items.0.1.items.6.items.1.value": [
      {
        identifierId: 0,
        value: "entry.4.identifier.0.value",
      },
    ],
    "items.0.2.items.0.value": {
      code: "entry.5.entry.substance.code",
      text: "entry.5.entry.substance.display",
    },
    "items.0.2.items.1.value": {
      code: "entry.5.entry.criticality.code",
      text: "entry.5.entry.criticality.display",
    },
    "items.0.2.items.2.items.0.value": {
      code: "entry.5.entry.verificationStatus.coding.0.code",
      text: "entry.5.entry.verificationStatus.coding.0.display",
    },
    "items.0.3.items.0.value": [
      {
        textId: 0,
        value: "entry.6.entry.comment",
      },
    ],
    "items.0.4.items.0.value": {
      code: "entry.7.entry.reason.code",
      text: "entry.7.entry.reason.display",
    },
    "items.0.4.items.1.value": "entry.7.entry.description",
    "items.0.4.items.3.items.0.value": "entry.7.entry.participant.name",
    "items.0.5.items.0.value": {
      code: "entry.8.entry.reason.code",
      text: "entry.8.entry.reason.display",
    },
    "items.0.5.items.1.value": "entry.8.entry.description",
    "items.0.5.items.3.items.0.value": "entry.8.entry.participant.name",
    "items.0.6.items.0.value": {
      code: "entry.9.entry.medication.medicationCodableConcept.code",
      text: "entry.9.entry.medication.medicationCodableConcept.display",
    },
    "items.0.6.items.1.items.0.value.unit": "mg",
    "items.0.6.items.1.items.0.value.value": "entry.9.entry.dosage.dose",
    "items.0.6.items.1.items.1.value": "entry.9.entry.dosage.text",
    "items.0.6.items.2.value.date":
      "entry.9.entry.effective.effectiveDateTime.date",
    "items.0.6.items.2.value.time":
      "entry.9.entry.effective.effectiveDateTime.time",
    "items.0.7.items.0.value": "entry.10.entry.comment",
    "items.0.8.items.0.value": "entry.11.entry.comment",
    "items.0.2.items.5.value": [],
    "items.0.9.items.0.value": "entry.13.name.0.text",
  };


  //------------------ código para mapeamento inverso ao que tínhamos feito ------------------

  const keysFHIR = getAllKeys(fhirMessage); // keys da mensagem fhir
  const valuesComposition = addAllValues(composition); // values da composition

  for (var key of keysFHIR) {
    for (var value of valuesComposition) {
      if (key === value) {
        compKey = getKeysByValue(composition, value)
        // console.log(compKey)
        composition[compKey] = fhirMessage[key] // cria nova entrada
        findAndReplaceValue(composition, value, fhirMessage[key]) // substitui valor na entry formato json
        console.log("NEW VALUE: ", composition[compKey])
      }
    }
  }

  console.log("COMPOSITION: ", composition);

  return composition;
}

// ---------------------------------------------------------------------

module.exports = router;
