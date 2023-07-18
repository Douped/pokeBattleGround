import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  QUERY_GET_USER_DATA,
  QUERY_SINGLE,
  QUERY_GET_POKEMON_MOVE_DATA,
  QUERY_GET_OPPONENT_MOVES,
} from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { RANDOMIZEOPPONENTMOVES } from "../../utils/mutations";

const Battle = () => {
  const [opponentHealth, setOpponentHealth] = useState(500);
  const [playerHealth, setPlayerHealth] = useState(500);

  const [randomizeOpponentMoves] = useMutation(RANDOMIZEOPPONENTMOVES);

  let { loading, data, refetch } = useQuery(QUERY_GET_USER_DATA, {});
  const pokemonList = data?.me || [];

  let { loading: singlePokemonLoading, data: firstPokemon } = useQuery(
    QUERY_SINGLE,
    { variables: { pokemonId: pokemonList.pokemon } }
  );

  const userPokemon = firstPokemon?.singlePokemon || [];

  let { loading: opponentLoading, data: opponentQueryData } = useQuery(
    QUERY_GET_OPPONENT_MOVES,
    {}
  );
  const opponentData = opponentQueryData?.getOpponentMoves || [];

  let { loading: userMovesLoading, data: userMovesData } = useQuery(
    QUERY_GET_POKEMON_MOVE_DATA,
    { variables: { pokemonID: pokemonList.pokemon } }
  );
  const userPokemonMovesList = userMovesData?.getPokemonMoveData || [];

  let { loading: opponentMovesLoading, data: opponentMovesData } = useQuery(
    QUERY_GET_POKEMON_MOVE_DATA,
    { variables: { pokemonID: opponentData[0]?.pokemon } }
  );

  const opponentPokemonMovesList = opponentMovesData?.getPokemonMoveData || [];

  let { loading: secondSinglePokemonLoading, data: secondPokemon } = useQuery(
    QUERY_SINGLE,
    { variables: { pokemonId: opponentData[0]?.pokemon } }
  );

  const brocksPokemon = secondPokemon?.singlePokemon || [];

  const brockMoves = [];
  if (opponentData && opponentData[0] && opponentData[0].moves) {
    opponentData[0].moves.forEach((move) => {
      opponentPokemonMovesList.forEach((moveComp) => {
        if (move === moveComp.moveID) {
          brockMoves.push(moveComp);
        }
      });
    });
  }

  const userMoves = [];
  if (pokemonList && pokemonList.pokemonMoves) {
    pokemonList.pokemonMoves.forEach((move) => {
      userPokemonMovesList.forEach((moveComp) => {
        if (move === moveComp.moveName) {
          userMoves.push(moveComp);
        }
      });
    });
  }
  console.log(userMoves);
  console.log(brockMoves);

  const handleRandomizeOpponentMoves = async () => {
    try {
      await randomizeOpponentMoves();
    } catch (error) {
      console.log("Error randomizing opponent moves:", error);
    }
  };
  useEffect(() => {
    handleRandomizeOpponentMoves();
  }, []);

  useEffect(() => {
    if (
      !loading &&
      !singlePokemonLoading &&
      !opponentLoading &&
      !userMovesLoading &&
      !opponentMovesLoading
    ) {
      refetch();
    }
  }, [
    loading,
    singlePokemonLoading,
    opponentLoading,
    userMovesLoading,
    opponentMovesLoading,
    refetch,
  ]);

  let dmg = 0;
  let aiDmg = 0;

  function generateAIMove() {
    const physicalMoves = brockMoves.filter(
      (move) => move.status === "physical"
    );
    const specialMoves = brockMoves.filter((move) => move.status === "special");
    const options = Math.floor(
      Math.random() * (physicalMoves.length + specialMoves.length)
    );
    const aiMove =
      options < physicalMoves.length
        ? physicalMoves[options]
        : specialMoves[options - physicalMoves.length];
    console.log(aiMove);
    return aiMove;
  }

  function calcDmg(usedMove) {
    let dmgValue = 0;
    if (usedMove.damage) {
      dmgValue = parseInt(usedMove.damage);
      console.log(dmgValue);
    }
    return dmgValue;
  }
  const navigate = useNavigate();

  function handleMove(move) {
    const opponentMaxHealth = 100;
    const playerMaxHealth = 100;
    let dmg = 0;
    let aiDmg = 0;

    const playerMove = move;

    if (playerMove.status === "special" || playerMove.status === "physical") {
      dmg = calcDmg(playerMove);
    }

    setOpponentHealth(opponentHealth - dmg);
    console.log(opponentHealth);
    if (opponentHealth - dmg <= 0) {
      navigate("/win");
      return;
    }

    const aiMove = generateAIMove();

    if (aiMove.status === "special" || aiMove.status === "physical") {
      aiDmg = calcDmg(aiMove);
    }

    setPlayerHealth(playerHealth - aiDmg);
    console.log(playerHealth);

    if (playerHealth - aiDmg <= 0) {
      navigate("/defeat");
      return;
    }

    document.getElementById("opponentHealth").value = opponentMaxHealth - dmg;
    document.getElementById("playerHealth").value = playerMaxHealth - aiDmg;
  }

  // ...

  return (
    <>
      <div className="flex flex-wrap flex-col justify-end gap-3 h-screen">
        <div className="flex flex-wrap flex-row justify-end gap-3">
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-center bg-slate-200 gap-5">
            <h1>{brocksPokemon.pokemonName}</h1>
            <p>
              HP
              <progress
                className="w-90%"
                id="opponentHealth"
                value={opponentHealth}
                max={500}
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
          {brocksPokemon.image && brocksPokemon.image[1] && (
            <div className="flex flex-wrap flex-col justify-end">
              <img src={brocksPokemon.image[0]} className="w-64 h-auto"></img>
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
                id="playerHealth"
                value={playerHealth}
                max={500}
                style={{ width: "95%" }}
              ></progress>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap flex-row gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
        {userMoves[0] && userMoves[0].moveName && (
          <button
            className="btn basis-1/3"
            onClick={() => handleMove(userMoves[0])}
          >
            {userMoves[0].moveName}
          </button>
        )}
        {userMoves[1] && userMoves[1].moveName && (
          <button
            className="btn basis-1/3"
            onClick={() => handleMove(userMoves[1])}
          >
            {userMoves[1].moveName}
          </button>
        )}
        {userMoves[2] && userMoves[2].moveName && (
          <button
            className="btn basis-1/3"
            onClick={() => handleMove(userMoves[2])}
          >
            {userMoves[2].moveName}
          </button>
        )}
        {userMoves[3] && userMoves[3].moveName && (
          <button
            className="btn basis-1/3"
            onClick={() => handleMove(userMoves[3])}
          >
            {userMoves[3].moveName}
          </button>
        )}
      </div>
    </>
  );
};

export default Battle;
