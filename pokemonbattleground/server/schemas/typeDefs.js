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
    moves: [Move]
    health: String!
  }

  type Move {
    moveID: ID!
    moveName: String!
    description: String
    types: String!
    damage: String!
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
    health: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    pokemon: [Pokemon]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(pokemonData: PokemonInput!): User
    removePokemon(pokemonID: ID!): User
  }
`;

module.exports = typeDefs;
