import { gql } from "@apollo/client";

export const SINGLEMOVE = gql`
  mutation singleMove($moveId: String!) {
    singleMove(moveID: $moveId) {
      moveID
      moveName
      description
      status
      type
      speed
      accuracy
      damage
      ailment
      pp
    }
  }
`;

export const ADDUSER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SAVEPOKEMON = gql`
  mutation Mutation($pokemonData: String!, $moveData: [String!]) {
    savePokemon(pokemonData: $pokemonData, moveData: $moveData) {
      username
      email
      pokemon
      pokemonMoves
    }
  }
`;
