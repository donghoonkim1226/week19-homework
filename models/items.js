var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  // reviews: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Review"
  // }]
});

module.exports = mongoose.model("Item", itemSchema);