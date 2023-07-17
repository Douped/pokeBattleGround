import { gql } from "@apollo/client";

export const QUERY_POKEMON = gql`
  query Pokemon {
    pokemon {
      pokemonName
      pokemonID
      image
      types
      moves
    }
  }
`;
export const QUERY_GET_USER_DATA = gql`
  query getUserData {
    me {
      pokemon
      pokemonMoves
    }
  }
`;

export const QUERY_MOVES = gql`
  query Moves {
    moves {
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
export const QUERY_GET_POKEMON_MOVE_DATA = gql`
  query GetPokemonMoveData($pokemonID: String!) {
    getPokemonMoveData(pokemonID: $pokemonID) {
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

export const QUERY_SINGLE = gql`
  query Query($pokemonId: String!) {
    singlePokemon(pokemonID: $pokemonId) {
      image
      moves
      moveIDs
      pokemonID
      pokemonName
      types
    }
  }
`;
