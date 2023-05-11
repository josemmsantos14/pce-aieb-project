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