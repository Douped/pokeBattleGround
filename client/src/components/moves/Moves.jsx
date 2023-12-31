import React from "react";

import { useState } from "react";

import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE, QUERY_GET_POKEMON_MOVE_DATA } from "../../utils/queries";
import { SAVEPOKEMON } from "../../utils/mutations";
import Auth from "../../utils/auth";

import "./moves.css";

const Moves = () => {
  // get data for individual pokemon
  let { pokemonID } = useParams();
  let { loading, data } = useQuery(QUERY_SINGLE, {
    variables: { pokemonId: pokemonID },
  });
  const pokemonList = data?.singlePokemon || [];

  //get move data for individual pokemon
  let { loading: moveLoad, data: moveData } = useQuery(
    QUERY_GET_POKEMON_MOVE_DATA,
    { variables: { pokemonID: pokemonID } }
  );
  const moveList = moveData?.getPokemonMoveData || [];

  let backgroundColor = "bg-gray-500";
  let backgroundColor2 = "bg-gray-500";

  // var state = useState([]);
  // var initialState = state[0]
  //  var setStateFunction = state[1]

  var [choosenMoves, setChoosenMoves] = useState([]);
  var [movesLength, setMovesLength] = useState(0);

  function deleteMove(move) {
    if (move === "Empty") return;

    var newChoosenMoves = choosenMoves;
    newChoosenMoves = newChoosenMoves.filter(
      (currentMove) => currentMove !== move
    );
    setChoosenMoves(newChoosenMoves);
    if (newChoosenMoves.length !== movesLength) {
      setMovesLength(movesLength - 1);
    }
  } // deleteMove

  // //set user pokemon
  // function setUserPokemon(data){
  //   console.log(data.)
  // }
  let backgroundColorForMoves;

  function getBackgroundForMoves(i) {
    switch (moveList[i].type) {
      case "normal":
        backgroundColorForMoves = "bg-gray-500";
        break;
      case "fire":
        backgroundColorForMoves = "bg-red-500";
        break;
      case "water":
        backgroundColorForMoves = "bg-blue-800";
        break;
      case "electric":
        backgroundColorForMoves = "bg-yellow-300";
        break;
      case "grass":
        backgroundColorForMoves = "bg-green-500";
        break;
      case "ice":
        backgroundColorForMoves = "bg-cyan-300";
        break;
      case "fighting":
        backgroundColorForMoves = "bg-orange-800";
        break;
      case "poison":
        backgroundColorForMoves = "bg-fuchsia-700";
        break;
      case "ground":
        backgroundColorForMoves = "bg-orange-300";
        break;
      case "flying":
        backgroundColorForMoves = "bg-sky-300";
        break;
      case "psychic":
        backgroundColorForMoves = "bg-pink-500";
        break;
      case "bug":
        backgroundColorForMoves = "bg-lime-500";
        break;
      case "rock":
        backgroundColorForMoves = "bg-yellow-700";
        break;
      case "ghost":
        backgroundColorForMoves = "bg-purple-800";
        break;
      case "dragon":
        backgroundColorForMoves = "bg-violet-900";
        break;
      default:
        backgroundColorForMoves = "bg-gray-500";
    }

    return backgroundColorForMoves;
  }

  function getBackground() {
    switch (pokemonList.types[0]) {
      case "normal":
        backgroundColor = "bg-gray-500";
        break;
      case "fire":
        backgroundColor = "bg-red-500";
        break;
      case "water":
        backgroundColor = "bg-blue-800";
        break;
      case "electric":
        backgroundColor = "bg-yellow-300";
        break;
      case "grass":
        backgroundColor = "bg-green-500";
        break;
      case "ice":
        backgroundColor = "bg-cyan-300";
        break;
      case "fighting":
        backgroundColor = "bg-orange-800";
        break;
      case "poison":
        backgroundColor = "bg-fuchsia-700";
        break;
      case "ground":
        backgroundColor = "bg-orange-300";
        break;
      case "flying":
        backgroundColor = "bg-sky-300";
        break;
      case "psychic":
        backgroundColor = "bg-pink-500";
        break;
      case "bug":
        backgroundColor = "bg-lime-500";
        break;
      case "rock":
        backgroundColor = "bg-yellow-700";
        break;
      case "ghost":
        backgroundColor = "bg-purple-800";
        break;
      case "dragon":
        backgroundColor = "bg-violet-900";
        break;
      default:
        backgroundColor = "bg-gray-500";
    }

    switch (pokemonList.types[1]) {
      case "normal":
        backgroundColor2 = "bg-gray-500";
        break;
      case "fire":
        backgroundColor2 = "bg-red-500";
        break;
      case "water":
        backgroundColor2 = "bg-blue-800";
        break;
      case "electric":
        backgroundColor2 = "bg-yellow-300";
        break;
      case "grass":
        backgroundColor2 = "bg-green-500";
        break;
      case "ice":
        backgroundColor2 = "bg-cyan-300";
        break;
      case "fighting":
        backgroundColor2 = "bg-orange-800";
        break;
      case "poison":
        backgroundColor2 = "bg-fuchsia-700";
        break;
      case "ground":
        backgroundColor2 = "bg-orange-300";
        break;
      case "flying":
        backgroundColor2 = "bg-sky-300";
        break;
      case "psychic":
        backgroundColor2 = "bg-pink-500";
        break;
      case "bug":
        backgroundColor2 = "bg-lime-500";
        break;
      case "rock":
        backgroundColor2 = "bg-yellow-700";
        break;
      case "ghost":
        backgroundColor2 = "bg-purple-800";
        break;
      case "dragon":
        backgroundColor2 = "bg-violet-900";
        break;

      default:
        backgroundColor2 = "bg-gray-500";
    }

    return { backgroundColor, backgroundColor2 };
  }

  const [savePokemon] = useMutation(SAVEPOKEMON);

  const handleBattleClick = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      console.log(token);
      const variables = {
        pokemonData: pokemonID,
        moveData: choosenMoves,
      };
      await savePokemon({ variables });
      console.log("mutation success!");
    } catch (err) {
      console.log(err);
    }
  };

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
              <div
                className={`w-60 rounded-lg border-2 border-black ${
                  getBackground().backgroundColor
                }`}
              >
                {pokemonList.types[0]}
              </div>
              {pokemonList.types[1] && (
                <div
                  className={`w-60 rounded-lg border-2 border-black ${
                    getBackground().backgroundColor2
                  }`}
                >
                  {pokemonList.types[1]}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap flex-row gap-3 justify-center">
            <div className="flex flex-warp flex-col gap-2 rounded-lg border-2 bg-indigo-300/[0.3] fix w-screen">
              Choosen Moves
              <div
                className="chosen-move"
                onClick={(event) => deleteMove(event.target.textContent)}
              >
                {movesLength > 0 ? choosenMoves[0] : "Empty"}
              </div>
              <div
                className="chosen-move"
                onClick={(event) => deleteMove(event.target.textContent)}
              >
                {movesLength >= 1 ? choosenMoves[1] : "Empty"}
              </div>
              <div
                className="chosen-move"
                onClick={(event) => deleteMove(event.target.textContent)}
              >
                {movesLength >= 2 ? choosenMoves[2] : "Empty"}
              </div>
              <div
                className="chosen-move"
                onClick={(event) => deleteMove(event.target.textContent)}
              >
                {movesLength >= 3 ? choosenMoves[3] : "Empty"}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-col gap-3 justify-center rounded-lg border-2 bg-indigo-300/[0.3] fix">
            <h1>Moves to Choose from</h1>
            <div className="max-h-[30rem] overflow-y-auto">
              <div
                className="panel-moves flex flex-wrap flex-row gap-3 justify-center rounded-lg bg-indigo-300/[0.3] fix"
                data-disabled={movesLength >= 4 ? "true" : "false"}
              >
                {moveList.map((pokemon, index) => (
                  <button
                    key={pokemon.moveID}
                    className={`basis-1/4 border-2 border-black rounded-lg ${getBackgroundForMoves(
                      index
                    )}`}
                    onClick={(event) => {
                      const move = event.target.textContent;
                      var newChoosenMoves = choosenMoves;
                      let moveExists = newChoosenMoves.includes(move);
                      if (!moveExists) {
                        newChoosenMoves.push(move);
                        setChoosenMoves(newChoosenMoves);
                        setMovesLength(movesLength + 1);
                      } else {
                        newChoosenMoves = newChoosenMoves.filter(
                          (currentMove) => currentMove !== move
                        );
                        setChoosenMoves(newChoosenMoves);
                        setMovesLength(movesLength - 1);
                      }
                    }}
                  >
                    <h1>{pokemon.moveName}</h1>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            {Auth.loggedIn() ? (
              <Link to="/battle">

                <button
                  className="flex flex-wrap flex-row justify-center btn btn-primary items-center"
                  onClick={() => {
                    handleBattleClick();
                  }}
                >
                  Battle
                </button>
              </Link>
            ) : (
              <div>Log in to battle other pokemon!</div>
            )}

              <button
                className="flex flex-wrap flex-row justify-center btn btn-primary items-center"
                onClick={() => {
                  handleBattleClick();
                }}
              >
                Battle
              </button>
            </Link>
            ): (
              <div>
                Log in to battle other pokemon!
                </div>
            )}
            
          </div>
        </div>
      )}
    </>
  );
};

export default Moves;
