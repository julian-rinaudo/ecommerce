const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Shirt_Model extends Model {}

Shirt_Model.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shirt_model" }
);

module.exports = Shirt_Model;
