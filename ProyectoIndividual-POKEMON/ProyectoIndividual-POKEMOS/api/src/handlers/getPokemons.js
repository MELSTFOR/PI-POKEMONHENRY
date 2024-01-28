const axios = require("axios");
const { getPokemonsFromAPI } = require("../controllers/pokemonsController");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

const getTypesNames = (typesDb) => typesDb.map(({ name }) => name);

async function getPokemons(req, res) {
  const name = req.query.name ? req.query.name : "";
  try {
    if (name) {
      const pokemon = await Pokemon.findOne({
        where: { name: { [Op.iLike]: name } },
        include: Type,
      });

      if (pokemon) {
        const newPokemon = {
          ...pokemon.dataValues,
          source: "db",
          types: getTypesNames(pokemon.dataValues.types),
        };
        res.json(newPokemon);
      } else {
        const pokemonsAPI = await getPokemonsFromAPI(name);

        res.json(pokemonsAPI);
      }
    } else {
      const pokemonsAPI = await getPokemonsFromAPI("");

      let dbPokemons = await Pokemon.findAll({ include: Type });

      const newdbPokemons = dbPokemons.map((dbPokemon) => ({
        ...dbPokemon.dataValues,
        source: "db",
        types: getTypesNames(dbPokemon.dataValues.types),
      }));

      const allPokemons = [...pokemonsAPI, ...newdbPokemons];

      res.json(allPokemons);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: "Ocurrió un error", message: err });
  }
}

module.exports = {
  getPokemons,
};
