const { Model, DataTypes } = require('sequelize');
const db = require('../db/');

class User extends Model {}

User.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    salt:{
        type: DataTypes.STRING,
        allowNull: true
    },
}, {sequelize: db, modelName: "users"});


module.exports = User;