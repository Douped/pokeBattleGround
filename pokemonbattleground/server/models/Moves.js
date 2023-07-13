const { Schema } = require("mongoose");

const movesSchema = new Schema({
  moveID: {
    type: String,
    required: true,
  },
  moveName: { type: String, required: true },
  description: { type: String, required: false },
  types: { type: String, required: true },
  damage: { type: String, required: true },
});

module.exports = movesSchema;
