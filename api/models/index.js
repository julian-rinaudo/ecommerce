const User = require("./User");
const Shirt_Model = require("./Shirt_Model");
const Shirt_Customize = require("./Shirt_Customized");
const Cart = require("./Cart");
const Cart_Item = require("./Cart_Item");

// User and Cart relationship
Cart.belongsTo(User);
User.hasOne(Cart);

// Cart_Item and Cart relationship
Cart_Item.belongsTo(Cart);
Cart.hasMany(Cart_Item);

// Shirt_Customize and User relationship
Shirt_Customize.belongsTo(User);
User.hasMany(Shirt_Customize);

// Shirt_Customize and Shirt_Model relationship
Shirt_Customize.belongsTo(Shirt_Model, {as: 'model'});
Shirt_Model.hasMany(Shirt_Customize, {as: 'model'});

module.exports = { User, Shirt_Customize, Shirt_Model, Cart, Cart_Item };
