const { Schema, model } = require("mongoose");

const movesSchema = new Schema({
  moveID: {
    type: String,
    required: true,
  },
  moveName: { type: String, required: true },
  description: { type: String, required: false },
  //1: non damaging, 2: Physical damage, controlled by Attack and Defense, 3: Special damage, controlled by Special Attack and Special Defense
  status: { type: String, required: false },
  type: { type: String, required: true },
  speed: { type: String, required: true },
  accuracy: { type: String, required: false },
  damage: { type: String, required: false },
  ailment: [{ type: String, required: false }],
  pp: { type: String, required: true },
});
const Move = model("Move", movesSchema);

module.exports = Move;
