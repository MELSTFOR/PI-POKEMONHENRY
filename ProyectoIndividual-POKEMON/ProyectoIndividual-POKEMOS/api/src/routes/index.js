const { Router } = require("express");
const { getPokemons } = require("../handlers/getPokemons.js");
const { getPokemonsById } = require("../handlers/getPokemonsId.js");
const { getTypesPokemons } = require("../handlers/getPokemonsTypes.js");
const { createPokemon } = require("../handlers/createPokemon.js");

const router = Router();

router.get("/", getPokemons);
router.get("/type", getTypesPokemons);
router.get("/:id", getPokemonsById);
router.post("/", createPokemon);

module.exports = router;
