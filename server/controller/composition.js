let CompositionModel = require('../model/composition');

// adicionar composition e mensagem fhir
module.exports.newComposition = async (items, fhir) => {
    try {
        let composition = new CompositionModel ({ composition: items, fhirMessage: fhir });
        let response = await composition.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}

module.exports.listCompositions = async () => {
    try {
      let composition = await CompositionModel.find({});
      console.log(composition);
      return {success: true, response: composition};
    } catch (err) {
        console.log(err);
        return {success: false, response: err};
    }
  };

  module.exports.findCompositionByID = async (id) => {
    try {
      let composition = await CompositionModel.findOne({_id: id});
      if (!composition) {
        return {exists: false};
      }
      return {exists: true, response: composition};
    } catch (err) {
        console.log(err);
        return {exists: false, response: err};
    }
  }