import { gql } from "@apollo/client";

export const QUERY_POKEMON = gql`
  query pokemon {
    pokemon {
      _id
      pokemonName
      pokemonID
      image
    }
  }
`;

// export const QUERY_POKEMON = gql
//   {
//     pokemon {
//       _id
//       pokemonID
//     }
//   }
// ;
