import React from "react";

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE } from "../../utils/queries";

import "./moves.css";

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
        <div className="text-2xl font-bold font-sans flex flex-col justify-center text-center gap-3 fix">
          <div className="flex flex-wrap flex-col gap-3 rounded-lg border-2 bg-indigo-300/[0.3] fix">
            <h1>{pokemonList.pokemonName}</h1>
            <img
              src={pokemonList.image[0]}
              alt="pokemon image"
              className="w-80 h-auto mx-auto"
            ></img>
            <h1>Type</h1>
            <div className="flex flex-wrap flex-row gap-3 justify-center">
              <div>dawdwad</div>
              <div>dawdawd</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row gap-3 justify-center">
            <div className="flex flex-warp flex-col gap-2 rounded-lg border-2 bg-indigo-300/[0.3] fix w-screen">
              Choosen Moves
              <div>dawdwad</div>
              <div>dawdawd</div>
              <div>dawdwad</div>
              <div>dawdawd</div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
            <h1>Moves to Choose from</h1>
            <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
              {pokemonList.moves.map((pokemon) => (
                // if(pokemon.move.type == "fire"){

                // }
                <button
                  key={pokemon.pokemonName}
                  className="hover:bg-blue-800 basis-1/4 border-2 border-black rounded-lg"
                >
                  <h1>{pokemon.moveName}</h1>
                </button>
              ))}
            </div>
          </div>
          <div>
            <Link to="/battle">
              <button className="flex flex-wrap flex-row justify-center btn btn-primary items-center">
                Battle
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Moves;
