const { Schema } = require("mongoose");
const movesSchema = require("./Moves");

const pokemonSchema = new Schema({
  pokemonID: {
    type: String,
    required: true,
  },
  pokemonName: { type: String, required: true },
  // description: {type: String, required: false,},
  image: { type: String, required: true },
  moves: [movesSchema],
  health: { type: String, required: true },
});

module.exports = pokemonSchema;
