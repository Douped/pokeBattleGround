const { Schema, model } = require("mongoose");

const opponentSchema = new Schema({
  opponentName: { type: String, required: false },
  // description: {type: String, required: false,},
  pokemon: { type: String, required: false },
  moves: [{ type: String, required: true }],
  health: { type: String, required: false },
});
const Opponent = model("Opponent", opponentSchema);

module.exports = Opponent;
