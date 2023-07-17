const { Schema, model } = require("mongoose");

const userPokemonSchema = new Schema({
  pokemonID: {
    type: String,
    required: true,
  },
  pokemonName: { type: String, required: false },
  // description: {type: String, required: false,},
  image: [{ type: String }],
  types: [{ type: String }],
  moves1: { type: String },
  moves2: { type: String },
  moves3: { type: String },
  moves4: { type: String },
  moveIDs1: { type: String },
  moveIDs2: { type: String },
  moveIDs3: { type: String },
  moveIDs4: { type: String },
  // health: { type: String, required: true },
});
const UserPokemon = model("UserPokemon", userPokemonSchema);

module.exports = UserPokemon;
