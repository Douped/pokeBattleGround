const { signToken } = require("../utils/auth");
const { User, Pokemon, Move } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pokemon: async () => {
      return Pokemon.find();
    },
    moves: async () => {
      return Move.find();
    },
    singlePokemon: async (parent, { pokemonID }) => {
      return Pokemon.findOne({ pokemonID: pokemonID });
    },
    singleMove: async (parent, { moveID }) => {
      let move = await Move.findOne({ moveID: moveID });
      return move;
    },
    singleMoveByName: async (parent, { moveName }) => {
      let move = await Move.findOne({ moveName: moveName });
      return move;
    },
    getPokemonMoveData: async (parent, { pokemonID }) => {
      const pokemon = await Pokemon.findOne({ pokemonID: pokemonID });
      if (!pokemon) {
        throw new Error("Pokemon not found!");
      }
      const moveData = [];
      for (const moveId of pokemon.moveIDs) {
        const moveDetails = await Move.findOne({ moveID: moveId });
        moveData.push(moveDetails);
      }
      return moveData;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials!");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    savePokemon: async (parent, { pokemonData, moveData }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { pokemon: pokemonData, pokemonMoves: moveData } },
            { new: true }
          );
          return updatedUser;
        }
        // throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.log(err);
      }
    },
    removePokemon: async (parent, { pokemonID }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pokemon: { pokemonID } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
