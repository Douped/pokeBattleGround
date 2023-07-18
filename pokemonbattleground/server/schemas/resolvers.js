const { signToken } = require("../utils/auth");
const { User, Pokemon, Move, Opponent } = require("../models");
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
    getOpponentMoves: async () => {
      try {
        const opponents = await Opponent.find();
        return opponents;
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching opponent moves");
      }
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
    randomizeOpponentMoves: async () => {
      await Opponent.deleteMany({});
      // Generate a random pokemon ID
      const randomID = Math.floor(Math.random() * 151) + 1;

      // Find the random pokemon
      const randomPokemon = await Pokemon.findOne({
        pokemonID: randomID.toString(),
      });

      const randomMoves = [];

      // If randomPokemon has moves
      if (randomPokemon.moveIDs.length > 0) {
        // Generate an array of unique random indices from moveIDs
        const uniqueRandomIndices = [];
        while (uniqueRandomIndices.length < randomPokemon.moveIDs.length) {
          const randomIndex = Math.floor(
            Math.random() * randomPokemon.moveIDs.length
          );
          if (!uniqueRandomIndices.includes(randomIndex)) {
            uniqueRandomIndices.push(randomIndex);
          }
        }
        // Populate randomMoves with moves from moveIDs using the unique indices
        for (let i = 0; i < 4; i++) {
          if (i < randomPokemon.moveIDs.length) {
            const moveIndex = uniqueRandomIndices[i];
            randomMoves.push(randomPokemon.moveIDs[moveIndex]);
          } else {
            // For moves beyond the available moves, push null or 0
            randomMoves.push("0");
          }
        }
      } else {
        // If randomPokemon has no moves, populate randomMoves with null or 0
        for (let i = 0; i < 4; i++) {
          randomMoves.push("0");
        }
      }
      console.log(randomMoves);

      await Opponent.create({
        opponentName: "brock",
        pokemon: randomID.toString(),
        moves: randomMoves,
      });
      const opponent = await Opponent.find();
      console.log(opponent);
    },
  },
};

module.exports = resolvers;
