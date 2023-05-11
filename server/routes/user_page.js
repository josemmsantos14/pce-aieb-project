var express = require("express");
var router = express.Router();
var CompositionController = require("../controller/composition.js");

// função post no node para adicionar à base de dados a composition submetida pelo user na página
router.post("/new-composition", async (req, res) => {
  let { composition, fhirMessage } = req.body;
  // console.log("COMPOSITION!!!!!!!!", composition);
  // console.log("FHIR!!!!!!!!", fhirMessage);
  const compositionResponse = await CompositionController.newComposition(JSON.parse(composition), fhirMessage);
  // console.log(compositionResponse);
  if (!compositionResponse.success) {
   return res.status(400).json({ response: compositionResponse.response});
  }
  else { 
   return res.status(200).json({ response: compositionResponse.response});
  }
})

module.exports = router; 
