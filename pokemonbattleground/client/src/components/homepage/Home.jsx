// import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_POKEMON } from "../../utils/queries";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POKEMON, {
    fetchPolicy: "no-cache",
  });

  const pokemonList = data?.pokemon || [];

  return (
    <>
      <div className="font-sans flex flex-row justify-center text-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
        First things first in order to play this fantastic game you must login
        to your previously made account, or make a new one by clicking either
        button at the top of your screen. You must first choose a pokemon to
        battle with for example Pikachu, afterwards you will be taken to a new
        page where you will be able to choose which 4 moves that the pokemon can
        learn. Once you choose you moves and click ont he button below you will
        be taken to another new page where you will battle vs and ai, the ai's
        pokemon and moves will be randomly choosen and so will its move
        selection in battle. You will choose between the 4 moves you want to use
        against the opponents pokemon until either pokemon faint/die, when you
        lose or win you will be taken to the end game page where you can choose
        to play again with the same pokemon, choose a new one, or quit where you
        will be sent to the hompage and logged out.
      </div>
      <div className="text-2xl font-bold font-sans flex flex-col justify-center text-center gap-2">
        <div className="flex flex-wrap flex-row gap-3 justify-center adjust items-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
          Choose Your Pokemon
          <div className="max-h-[80rem] overflow-y-auto">
            <div className="flex flex-wrap flex-row gap-3 justify-center adjust items-center rounded bg-indigo-300/[0.3] fix">
              {pokemonList.map((pokemon) => (
                <div
                  key={pokemon.pokemonID}
                  className="basis-1/4 justify-center items-center text-center place-items-center border-2 border-black rounded-lg"
                >
                  <Link to={{ pathname: `/moves/${pokemon.pokemonID}` }}>
                    <p>{pokemon.pokemonName}</p>
                    <div className="flex flex-wrap flex-row justify-center">
                      <img src={pokemon.image[0]} alt="pokemon"></img>
                    </div>
                    <p>{pokemon.pokemonID}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center fix">
          <a
            href="https://pokemondb.net/type/old"
            className="btn btn-primary"
            target="_blank"
          >
            Pokemon Types Chart
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
