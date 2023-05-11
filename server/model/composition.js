var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CompositionSchema = new Schema({
  composition: {type: Schema.Types.Mixed}
});

module.exports = mongoose.model("composition", CompositionSchema);
