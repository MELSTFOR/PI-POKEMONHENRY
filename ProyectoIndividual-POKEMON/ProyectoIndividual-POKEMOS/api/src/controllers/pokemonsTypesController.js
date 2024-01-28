const axios = require("axios");
const { API_KEY } = process.env;
const { Pokemon, Type } = require("../db.js");

async function getPokemonsByTypes() {
  const typesInDatabase = await Type.findAll();
  console.log(typesInDatabase);

  if (typesInDatabase.length === 0) {
    const url = "https://pokeapi.co/api/v2/type";
    const typesPokemons = await axios.get(url);

    const typesToSave = typesPokemons.data.results.map((type) => {
      const parts = type.url.split("/");
      const id = parts[parts.length - 2];

      return {
        id,
        name: type.name,
      };
    });

    return typesToSave;
  }
}

// const allTypes = await Type.findAll({
//   attributes: ["name"],

module.exports = {
  getPokemonsByTypes,
};

// const axios = require("axios");
// const { API_KEY } = process.env;
// const { Pokemon, Type, sequelize } = require("../db.js");
// console.log("valor de seq", sequelize);

// async function getPokemonsByTypes() {
//   const typesInDatabase = await Type.findAll();

//   if (typesInDatabase.length === 0) {
//     const url = "https://pokeapi.co/api/v2/type";
//     const typesPokemons = await axios.get(url);
//     const typesToSave = typesPokemons.data.results.map((T) => ({
//       name: T.name,
//     }));

//     try {
//       await sequelize.transaction(async (t) => {
//         await Type.bulkCreate(typesToSave, { transaction: t });
//       });

//       return typesToSave;
//     } catch (error) {
//       console.error("Error al guardar tipos en la base de datos:", error);
//       return [];
//     }
//   }

//   const existingTypes = typesInDatabase.map((type) => ({
//     name: type.name,
//   }));

//   return existingTypes;
// }

// module.exports = {
//   getPokemonsByTypes,
// };
