const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import pokemon schema
const pokemonSchema = require("./Pokemon");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Must use a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    pokemon: pokemonSchema,
  },
  // set this to use virtuals
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// add virtuals here

const User = model("User", userSchema);

module.exports = User;
