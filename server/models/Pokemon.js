const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  pokemonID: {
    type: String,
    required: true,
  },
  pokemonName: { type: String, required: true },
  // description: {type: String, required: false,},
  image: [{ type: String, required: true }],
  types: [{ type: String, required: true }],
  moves: [{ type: String, required: true }],
  moveIDs: [{ type: String, required: true }],
  // health: { type: String, required: true },
});
const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
