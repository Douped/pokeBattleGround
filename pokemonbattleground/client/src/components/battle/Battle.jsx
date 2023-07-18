import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  QUERY_GET_USER_DATA,
  QUERY_SINGLE,
  QUERY_GET_POKEMON_MOVE_DATA,
} from "../../utils/queries";

const Battle = () => {
  let { loading, data, refetch } = useQuery(QUERY_GET_USER_DATA, {});
  const pokemonList = data?.me || [];
  console.log(pokemonList);

  let { loading: singlePokemonLoading, data: firstPokemon } = useQuery(
    QUERY_SINGLE,
    { variables: { pokemonId: pokemonList.pokemon } }
  );

  const userPokemon = firstPokemon?.singlePokemon || [];
  console.log(userPokemon);

  useEffect(() => {
    if (!loading && !singlePokemonLoading) {
      refetch();
    }
  }, [loading, singlePokemonLoading, refetch]);

  function handleMove() {
    console.log("hi");
  }
  return (
    <>
      <div className="flex flex-wrap flex-col justify-end gap-3 h-screen">
        <div className="flex flex-wrap flex-row justify-end gap-3">
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-center bg-slate-200 gap-5">
            <h1>{userPokemon.pokemonName}</h1>
            <p>
              HP
              <progress
                id="opponentmaxHealth"
                value="100"
                max="100"
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
          {userPokemon.image && userPokemon.image[1] && (
            <div className="flex flex-wrap flex-col justify-end">
              <img src={userPokemon.image[0]} className="w-64 h-auto"></img>
            </div>
          )}
        </div>
        <div className="flex flex-wrap flex-row gap-3">
          {userPokemon.image && userPokemon.image[1] && (
            <div className="flex flex-wrap flex-col justify-end">
              <img src={userPokemon.image[1]} className="w-64 h-auto"></img>
            </div>
          )}
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-center bg-slate-200 gap-2">
            <h1>{userPokemon.pokemonName}</h1>
            <p>
              HP
              <progress
                className="w-90%"
                id="opponentHealth"
                value="100"
                max="100"
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
        </div>

        {
          /* <BattleAnnouncer
          // message={
          //   announcerMessage ||
          //   "what will" +
          //     {
          //       /*enter pokemon name here*/
          //     } +
          //     "do?"
          // }
          // /> */
        }
      </div>
      <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
        {userPokemon.moves && userPokemon.moves[0] && (
          <button className="btn basis-1/3" onClick={handleMove}>
            {userPokemon.moves[0]}
          </button>
        )}
        {userPokemon.moves && userPokemon.moves[1] && (
          <button className="btn basis-1/3" onClick={handleMove}>
            {userPokemon.moves[1]}
          </button>
        )}
        {userPokemon.moves && userPokemon.moves[2] && (
          <button className="btn basis-1/3" onClick={handleMove}>
            {userPokemon.moves[2]}
          </button>
        )}
        {userPokemon.moves && userPokemon.moves[3] && (
          <button className="btn basis-1/3" onClick={handleMove}>
            {userPokemon.moves[3]}
          </button>
        )}
      </div>
    </>
  );
};

export default Battle;
