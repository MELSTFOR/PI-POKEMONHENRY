const axios = require("axios");
const {
  getPokemonsByIdFromAPI,
} = require("../controllers/pokemonsIdController");

async function getPokemonsById(req, res) {
  const { id } = req.params;

  try {
    if (parseInt(id) < 500000) {
      const pokemonsAPI = await getPokemonsByIdFromAPI(id);

      res.json(pokemonsAPI);
    } else {
      console.log("Buscar en la db");
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: "Ocurrió un error" });
  }
}

module.exports = {
  getPokemonsById,
};
