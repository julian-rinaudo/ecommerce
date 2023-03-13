const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Cart extends Model {}

Cart.init(
  {
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
