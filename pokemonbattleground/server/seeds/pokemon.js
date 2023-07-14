const db = require("../config/connection");
const { model } = require("mongoose");
const { Pokemon, User, Moves, Presets } = require("../models");
const fetch = require("node-fetch");

const pokimane = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

const pokiMoves = "https://pokeapi.co/api/v2/pokemon/";
const pokemonDataJson = [];

async function getPokemonData() {
  db.once("open", async () => {
    try {
      await Pokemon.deleteMany({});
      await User.deleteMany({});
      // await Moves.deleteMany({});
      // await Presets.deleteMany({});

      const pokemonResponse = await fetch(pokimane);
      const pokemonData = await pokemonResponse.json();

      await Promise.all(
        pokemonData.results.map(async (element) => {
          const res = await fetch(element.url);
          const pokemon = await res.json();
          const sprites = pokemon.sprites.front_default;
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
  });
  return pokemonDataJson;
}

// async function getPokemonMoves(event) {
//   console.log(event.target.dataset);
//   let pokemonID = event.target.dataset;
//   let link = pokiMoves + event.target.dataset;
//   const movesetData = "";
//   try {
//     movesetData = fetch(link);
//   } catch (err) {
//     throw err;
//   }
// }

// //queryselect on pokemon choices
// const pokemonButtons = document.querySelectorAll("pokemon");
// pokemonButtons.forEach((button) => {
//   button.addEventListener("click", getPokemonMoves);
// });
