const axios = require("axios");
const { API_KEY } = process.env;
const { Pokemon, Type } = require("../db.js");

const getStat = (stats, name) => {
  return stats.find((stat) => stat.stat.name === name);
};

const getIMG = async (idExtraido) => {
  let imagen = null;

  if (idExtraido) {
    const url = `https://pokeapi.co/api/v2/pokemon-form/${idExtraido}/`;
    try {
      const pokeIMG = await axios.get(url);
      imagen = pokeIMG.data.sprites.front_shiny;
    } catch (error) {
      console.error(
        `Error fetching image for Pokemon with ID ${idExtraido}: ${error}`
      );
      return null;
    }
  }

  return imagen;
};

const getIdFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

const getInfoPokemon = async (pokemonFromAPI) => {
  const {
    stats: infoId,
    weight: weightInfo,
    height: heightInfo,
    types,
  } = pokemonFromAPI.data;

  const hpInfo = getStat(infoId, "hp");
  const attackInfo = getStat(infoId, "attack");
  const defenseInfo = getStat(infoId, "defense");
  const speedInfo = getStat(infoId, "speed");

  const urlInfo = pokemonFromAPI.data.forms[0].url;

  const idExtraido = getIdFromUrl(urlInfo);

  const imagen = await getIMG(idExtraido);

  const pokemon = {
    id: idExtraido,
    name: pokemonFromAPI.data.forms[0].name,
    source: "Api",
    url: urlInfo,
    image: imagen,
  };

  if (
    hpInfo &&
    attackInfo &&
    defenseInfo &&
    speedInfo &&
    weightInfo &&
    heightInfo
  ) {
    const baseStat = hpInfo.base_stat;
    const baseStat2 = attackInfo.base_stat;
    const baseStat3 = defenseInfo.base_stat;
    const baseStat4 = speedInfo.base_stat;
    const pokemonTypes = types.map((typeInfo) => typeInfo.type.name);
    console.log(`El valor de base_stat para hp es: ${baseStat}`);
    console.log(`El valor de base_stat para attack es: ${baseStat2}`);
    console.log(`El valor de base_stat para defense es: ${baseStat3}`);
    console.log(`El valor de base_stat para speed es: ${baseStat4}`);
    console.log(`El valor de base_stat para weight es: ${weightInfo}`);
    console.log(`El valor de base_stat para height es: ${heightInfo}`);
    console.log(`Tipos de Pokémon: ${pokemonTypes.join(", ")}`);

    return {
      ...pokemon,
      hp: baseStat,
      attack: baseStat2,
      defense: baseStat3,
      speed: baseStat4,
      weight: weightInfo,
      height: heightInfo,
      types: pokemonTypes,
    };
  }
};

async function getPokemonsFromAPI(name) {
  console.log(name);

  try {
    if (name !== "") {
      url = `https://pokeapi.co/api/v2/pokemon/${name}?key=${API_KEY}`;
    } else {
      url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`;
    }

    const pokemonsAPI = await axios.get(url);

    console.log("pokemonsAPI data", pokemonsAPI.data);

    if (name) {
      return getInfoPokemon(pokemonsAPI);
    } else {
      return Promise.all(
        pokemonsAPI.data.results.map(async (P) => {
          const idExtraido = getIdFromUrl(P.url);

          const infoUrl = `https://pokeapi.co/api/v2/pokemon/${idExtraido}/`;

          const info1 = await axios.get(infoUrl);

          return getInfoPokemon(info1);
        })
      );
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}
async function savePokemon(data) {
  console.log(data);

  const { name, image, hp, attack, defense, speed, height, weight, types } =
    data;

  try {
    console.log("GUARDAR POKEMON!!!!");

    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    });

    console.log({ newPokemon });

    newPokemon.setTypes(types);

    return { message: "Pokemon guardado correctamente!" };
  } catch (error) {
    console.error("Error al crear el Pokemon", error);
    throw error;
  }
}

module.exports = {
  getPokemonsFromAPI,
  getInfoPokemon,
  savePokemon,
};
