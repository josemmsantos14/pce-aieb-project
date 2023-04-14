var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompositionSchema = new Schema({
  any: Schema.Types.Mixed,
});

module.exports = mongoose.model("composition", CompositionSchema);
