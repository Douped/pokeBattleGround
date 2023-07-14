const db = require("../config/connection");
const { model } = require("mongoose");
const { Pokemon, User, Moves, Presets } = require("../models");
const fetch = require("node-fetch");

const pokimane = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
const pokiMoves = "https://pokeapi.co/api/v2/pokemon/";

const pokemonDataJson = [];
db.once("open", async () => {
  try {
    await Pokemon.deleteMany({});
    await User.deleteMany({});
    //await Moves.deleteMany({});
    // await Presets.deleteMany({});

    const pokemonResponse = await fetch(pokimane);
    const pokemonData = await pokemonResponse.json();

    await Promise.all(
      pokemonData.results.map(async (element) => {
        const res = await fetch(element.url);
        const pokemon = await res.json();
        const sprites = [
          pokemon.sprites.front_default,
          pokemon.sprites.back_default,
        ];
        pokemonDataJson.push({
          pokemonName: element.name,
          pokemonID: element.url.split("/")[6],
          image: sprites,
        });
      })
    );
    Pokemon.create(pokemonDataJson);
    console.log(pokemonDataJson);
  } catch (err) {
    throw err;
  }
  console.log("Done");
  process.exit(0);
});
