const { savePokemon } = require("../controllers/pokemonsController");

async function createPokemon(req, res) {
  try {
    console.log("Guardar", req.body);

    const result = await savePokemon(req.body);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createPokemon };
