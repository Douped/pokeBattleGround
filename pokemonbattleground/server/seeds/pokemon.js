const db = require("../config/connection");
const { model } = require("mongoose");
const { Pokemon, User, Move, Opponent } = require("../models");
const fetch = require("node-fetch");

const pokimane = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
const pokiMoves = "https://pokeapi.co/api/v2/move?limit=165&offset=0";
const singleMove = "https://pokeapi.co/api/v2/move/";
const pokemonDataJson = [];
const pokemonMovesDataJson = [];
db.once("open", async () => {
  try {
    await Pokemon.deleteMany({});
    await User.deleteMany({});
    await Move.deleteMany({});
    await Opponent.deleteMany({});
    // await Presets.deleteMany({});
    //get pokemon data
    const pokemonResponse = await fetch(pokimane);
    const pokemonData = await pokemonResponse.json();

    //get moves data
    const movesResponse = await fetch(pokiMoves);
    const movesData = await movesResponse.json();

    await Promise.all(
      pokemonData.results.map(
        async (element) => {
          const moveNameList = [];
          const moveIDList = [];
          const res = await fetch(element.url);
          const pokemon = await res.json();
          const sprites = [
            pokemon.sprites.front_default,
            pokemon.sprites.back_default,
          ];
          const pokemonTypes = [pokemon.types[0].type.name];
          if (pokemon.types.length === 2) {
            pokemonTypes.push(pokemon.types[1].type.name);
          }
          //map over moves and filter out moves from other generations
          const filteredMoves = pokemon.moves.filter((move) => {
            const number = parseInt(move.move.url.split("/")[6]);
            return number <= 165;
          });
          //filteredMoves becomes an array of each move
          /*
        [
  {
    move: { name: 'string-shot', url: 'https://pokeapi.co/api/v2/move/81/' },
    version_group_details: [ [Object] ]
  },
        ]
        */
          //push the names of the filtered moves into the movesList array
          filteredMoves.forEach((move) => {
            moveNameList.push(move.move.name);
            moveIDList.push(move.move.url.split("/")[6]);
          });

          //push the pokemon data to the array
          pokemonDataJson.push({
            pokemonName: element.name,
            pokemonID: element.url.split("/")[6],
            image: sprites,
            types: pokemonTypes,
            moves: moveNameList,
            moveIDs: moveIDList,
          });
          //get data for each move and push it to the pokemonMovesDataJson array
        },

        movesData.results.forEach(async (move) => {
          //for each move call the api to get specific move data
          let id = move.url.split("/")[6];
          //call api for each move and map move data to move model
          const moveRes = await fetch(singleMove + id);
          const rawMoveData = await moveRes.json();
          pokemonMovesDataJson.push({
            moveID: id,
            moveName: rawMoveData.names[7].name,
            description: rawMoveData.effect_entries[0].short_effect,
            status: rawMoveData.damage_class.name,
            type: rawMoveData.type.name,
            speed: rawMoveData.priority,
            accuracy: rawMoveData.accuracy,
            damage: rawMoveData.power,
            ailment: rawMoveData.meta.ailment.name,
            pp: rawMoveData.pp,
          });
        })
      )
    );
    //create model with pokemonData
    await Pokemon.create(pokemonDataJson);
    //create model with movesData
    await Move.create(pokemonMovesDataJson);
  } catch (err) {
    throw err;
  }

  try {
    // Generate a random pokemon ID
    const randomID = Math.floor(Math.random() * 151) + 1;

    // Find the random pokemon
    const randomPokemon = await Pokemon.findOne({
      pokemonID: randomID.toString(),
    });

    const randomMoves = [];

    // If randomPokemon has moves
    if (randomPokemon.moveIDs.length > 0) {
      // Generate an array of unique random indices from moveIDs
      const uniqueRandomIndices = [];
      while (uniqueRandomIndices.length < randomPokemon.moveIDs.length) {
        const randomIndex = Math.floor(
          Math.random() * randomPokemon.moveIDs.length
        );
        if (!uniqueRandomIndices.includes(randomIndex)) {
          uniqueRandomIndices.push(randomIndex);
        }
      }
      // Populate randomMoves with moves from moveIDs using the unique indices
      for (let i = 0; i < 4; i++) {
        if (i < randomPokemon.moveIDs.length) {
          const moveIndex = uniqueRandomIndices[i];
          randomMoves.push(randomPokemon.moveIDs[moveIndex]);
        } else {
          // For moves beyond the available moves, push null or 0
          randomMoves.push("0");
        }
      }
    } else {
      // If randomPokemon has no moves, populate randomMoves with null or 0
      for (let i = 0; i < 4; i++) {
        randomMoves.push("0");
      }
    }
    console.log(randomMoves);
    await Opponent.create({
      opponentName: "brock",
      pokemon: randomID.toString(),
      moves: randomMoves,
    });
    const opponent = await Opponent.find();
  } catch (err) {
    console.log(err);
  }

  console.log("Done");
  process.exit(0);
});
