const axios = require("axios");
const {
  getPokemonsByTypes,
} = require("../controllers/pokemonsTypesController");

const { Type } = require("../db.js");

async function getTypesPokemons(req, res) {
  try {
    const typesInDatabase = await Type.findAll();
    console.log(typesInDatabase);

    let pokemonsTypes = [];
    if (typesInDatabase.length === 0) {
      pokemonsTypes = await getPokemonsByTypes();

      const { Type } = require("../db.js");
      await Type.bulkCreate(pokemonsTypes);
    } else {
      pokemonsTypes = typesInDatabase;
    }

    res.json(pokemonsTypes);
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: "Ocurrió un error" });
  }
}

module.exports = {
  getTypesPokemons,
};
