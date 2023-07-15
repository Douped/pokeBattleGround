import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE } from "../../utils/queries";

const Moves = () => {
  let { pokemonID } = useParams();
  console.log(pokemonID);
  const { loading, data } = useQuery(QUERY_SINGLE, {
    variables: { pokemonId: pokemonID },
  });

  const pokemonList = data?.pokemonMove || [];

  console.log(pokemonList);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <div className="text-2xl font-bold font-sans flex flex-col justify-center text-center gap-2">
            <h1>{pokemonList.pokemonName}</h1>
            <img src={pokemonList.image[0]} alt="pokemon image"></img>

            <div className="flex flex-wrap flex-row gap-3 justify-center">
              {pokemonList.moves.map((pokemon) => (
                if(pokemon.move.type == "fire"){
                  
                }
                <button
                  key={pokemon.pokemonName}
                  className="hover:bg-blue-800 basis-1/4 border-2 border-black rounded-lg"
                >
                  <h1>{pokemon.moveName}</h1>
                  {/* {pokemon.moveName} */}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Moves;
