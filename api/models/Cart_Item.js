const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Cart_Item extends Model {}

Cart_Item.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "Cart_Item" }
);

module.exports = Cart_Item;
