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


