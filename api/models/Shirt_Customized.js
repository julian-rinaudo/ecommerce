const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Shirt_Customize extends Model {}

Shirt_Customize.init(
  {
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shirt_customize" }
);

module.exports = Shirt_Customize;
