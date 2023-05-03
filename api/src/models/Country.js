const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
     id: {
      type: DataTypes.STRING (3),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageFlag: {
      type: DataTypes.STRING,
      allowNull: false

    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capitalCountry: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  },{
    timestamps: false
  });
};
