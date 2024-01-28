const axios = require("axios");
const { API_KEY } = process.env;
const { Pokemon, Type } = require("../db.js");
const { getInfoPokemon } = require("./pokemonsController.js");
const { getPokemonsFromAPI } = require("./pokemonsController.js");

async function getPokemonsByIdFromAPI(id) {
  if (id !== "") {
    url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  }

  const pokemonsIdAPI = await axios.get(url);
  if (pokemonsIdAPI) {
    return getInfoPokemon(pokemonsIdAPI);
  } else {
    const name = "";
    return getPokemonsFromAPI(name);
  }
}

module.exports = {
  getPokemonsByIdFromAPI,
};
