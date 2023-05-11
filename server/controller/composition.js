let CompositionModel = require('../model/composition');

// adicionar composition
module.exports.newComposition = async (items) => {
    try {
        let composition = new CompositionModel ({ composition: items });
        let response = await composition.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}