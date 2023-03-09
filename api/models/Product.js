const { Model, DataTypes } = require('sequelize');
const db = require('../db/');

class Product extends Model {}

Product.init({
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    design: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {sequelize: db, modelName: "products"});


module.exports = Product;