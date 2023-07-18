import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  QUERY_GET_USER_DATA,
  QUERY_SINGLE,
  QUERY_GET_POKEMON_MOVE_DATA,
  QUERY_GET_OPPONENT_MOVES,
} from "../../utils/queries";

import { RANDOMIZEOPPONENTMOVES } from "../../utils/mutations";

const Battle = () => {
  const [opponentHealth, setOpponentHealth] = useState("");
  const [playerHealth, setPlayerHealth] = useState("");


  const [randomizeOpponentMoves] = useMutation(RANDOMIZEOPPONENTMOVES);
  
  let { loading, data, refetch } = useQuery(QUERY_GET_USER_DATA, {});
  const pokemonList = data?.me || [];
  //console.log(pokemonList);

  let { loading: singlePokemonLoading, data: firstPokemon } = useQuery(
    QUERY_SINGLE,
    { variables: { pokemonId: pokemonList.pokemon } }
  );

  const userPokemon = firstPokemon?.singlePokemon || [];
  //console.log(userPokemon);

  //copied stuff

  let { loading: opponentLoading, data: opponentQueryData } = useQuery(
    QUERY_GET_OPPONENT_MOVES,
    {}
  );
  const opponentData = opponentQueryData?.getOpponentMoves || [];
   //console.log(opponentData);

  let { loading: userMovesLoading, data: userMovesData } = useQuery(
    QUERY_GET_POKEMON_MOVE_DATA,
    { variables: { pokemonID: pokemonList.pokemon } }
  );
  const userPokemonMovesList = userMovesData?.getPokemonMoveData || [];
   //console.log(userPokemonMovesList);

  let { loading: opponentMovesLoading, data: opponentMovesData } = useQuery(
    QUERY_GET_POKEMON_MOVE_DATA,
    { variables: { pokemonID: opponentData[0]?.pokemon } }
  );

  const opponentPokemonMovesList = opponentMovesData?.getPokemonMoveData || [];
  //console.log(opponentPokemonMovesList);

  let { loading: secondSinglePokemonLoading, data: secondPokemon } = useQuery(
    QUERY_SINGLE,
    { variables: { pokemonId: opponentData[0]?.pokemon } }
  );

  const brocksPokemon = secondPokemon?.singlePokemon || [];
  //filter through opponents moves list and add move data for opponents moves to an array

  const brockMoves = [];
  if (opponentData && opponentData[0] && opponentData[0].moves) {
    opponentData[0].moves.forEach((move) => {
      //console.log(move);
      opponentPokemonMovesList.forEach((moveComp) => {
        if (move === moveComp.moveID) {
          brockMoves.push(moveComp);
        }
      });
    });
  }
  //console.log(brockMoves);
  //filter through moves list and add move data for user moves to an array
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


      // Function to randomize opponent moves and fetch updated opponent data
  const handleRandomizeOpponentMoves = async () => {
    try {
      // Call the mutation to randomize opponent moves
      await randomizeOpponentMoves();

      // After randomizing, refetch the opponent data to get the updated values
      // You can use the refetch function provided by useQuery for this
      //QUERY_GET_OPPONENT_MOVES.refetch();
      
    } catch (error) {
      console.log("Error randomizing opponent moves:", error);
    }
  };
  useEffect(() =>{
    handleRandomizeOpponentMoves();
  },[]
  );

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

  //generate an ai move

  let dmg = "0";
  let aiDmg = "0";

  function generateAIMove() {
    const options = Math.floor(Math.random() * brockMoves.length);
    const aiMove = brockMoves[options];

    return aiMove;
  }

  

  function calcDmg(usedMove) {
    let dmgValue = '';
    if(usedMove.damage){
      console.log(usedMove.damage);
      dmgValue = usedMove.damage;
    }



    return dmgValue;
  }

  function handleMove(move) {

    console.log(move);
    const playerMove = move;

    if (playerMove.status === "special" || "physical") {
      dmg = calcDmg(playerMove);
    }

    const updatedOpponentHealth = opponentHealth - dmg;

    if (updatedOpponentHealth <= 0) {
      return;
    }

    const aiMove = generateAIMove();

    if (aiMove == "special" || "physical") {
      aiDmg = calcDmg(aiMove);
    }

    const updatedPlayerHealth = playerHealth - aiDmg;

    if (updatedOpponentHealth <= 0) {
      return;
    }

    setOpponentHealth(updatedOpponentHealth);
    setPlayerHealth(updatedPlayerHealth);
  }

  return (
    <>
      <div className="flex flex-wrap flex-col justify-end gap-3 h-screen">
        <div className="flex flex-wrap flex-row justify-end gap-3">
          <div className="flex flex-wrap flex-col basis-1/3 border-2 border-black rounded-lg justify-center bg-slate-200 gap-5">
            <h1>{brocksPokemon.pokemonName}</h1>
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
{userMoves[0] && userMoves[0].moveName && (
          <button
            className="btn basis-1/3"
            onClick={()=>handleMove(userMoves[0].moveName)}
          >
            {userMoves[0].moveName}
          </button>
        )}
        {userMoves[1] && userMoves[1].moveName && (
          <button
            className="btn basis-1/3"
            onClick={()=>handleMove(userMoves[1].moveName)}
          >
            {userMoves[1].moveName}
          </button>
        )}
        {userMoves[2] && userMoves[2].moveName && (
          <button
            className="btn basis-1/3"
            onClick={()=>handleMove(userMoves[2].moveName)}
          >
            {userMoves[2].moveName}
          </button>
        )}
        {userMoves[3] && userMoves[3].moveName && (
          <button
            className="btn basis-1/3"
            onClick={()=>handleMove(userMoves[3].moveName)}
          >
            {userMoves[3].moveName}
          </button>
    )}
      </div>
    </>
  );
};

export default Battle;
