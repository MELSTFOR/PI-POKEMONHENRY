require("dotenv").config();
const { Sequelize } = require("sequelize");
const definePokemonModel = require("./models/pokemonModel");
const defineTypeModel = require("./models/typeModel");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
  {
    logging: false,
    native: false,
    define: {
      timestamps: false,
    },
  }
);

const Pokemon = definePokemonModel(sequelize);
const Type = defineTypeModel(sequelize);

Pokemon.belongsToMany(Type, { through: "type_pokemon" });
Type.belongsToMany(Pokemon, { through: "type_pokemon" });

module.exports = {
  Pokemon,
  Type,
  conn: sequelize,
};
