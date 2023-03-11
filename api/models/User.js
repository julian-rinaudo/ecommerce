const { Model, DataTypes } = require("sequelize");
const db = require("../db/");

class User extends Model {}

User.init(
  {
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;
