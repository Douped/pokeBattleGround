const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    pokemon: [Pokemon]
    presets: [Preset]
  }

  type Pokemon {
    pokemonID: ID!
    pokemonName: String!
    # optional
    # description: String
    image: [String!]
    moves: [String!]
    moveIDs: [String!]
    moveType: [String!]
    types: [String!]
  }

  type Move {
    moveID: String!
    moveName: String!
    description: String
    status: String
    type: String!
    speed: String!
    accuracy: String
    damage: String
    ailment: [String]
    pp: String!
  }

  type Preset {
    presetID: ID!
    userId: ID!
    pokemon: Pokemon!
  }

  input PokemonInput {
    pokemonID: String!
    pokemonName: String!
    # description: String!
    image: [String!]
    moves: [String!]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    pokemon: [Pokemon]
    moves: [Move]
    singlePokemon(pokemonID: String!): Pokemon
    singleMove(moveID: String!): Move
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(pokemonData: PokemonInput!): User
    removePokemon(pokemonID: ID!): User
  }
`;

module.exports = typeDefs;
