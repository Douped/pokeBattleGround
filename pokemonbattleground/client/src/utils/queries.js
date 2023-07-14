import { gql } from "@apollo/client";

export const QUERY_POKEMON = gql`
  query Pokemon {
    pokemon {
      pokemonName
      pokemonID
      image
    }
  }
`;

export const QUERY_SINGLE = gql`
  query Query($pokemonId: ID!) {
    pokemonMove(pokemonID: $pokemonId) {
      image
      moves {
        moveName
      }
      pokemonName
    }
  }
`;
