const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "pokemons",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER, // Propiedad de Ataque
      },
      defense: {
        type: DataTypes.INTEGER, // Propiedad de Defensa
      },
      speed: {
        type: DataTypes.INTEGER, // Propiedad de Velocidad
      },
      height: {
        type: DataTypes.DECIMAL, // Propiedad de Altura
      },
      weight: {
        type: DataTypes.DECIMAL, // Propiedad de Peso
      },
    },
    {
      freezeTableName: true,
    }
  );
};
