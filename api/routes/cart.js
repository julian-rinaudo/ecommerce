const express = require("express");
const { Cart, Cart_Item, Shirt_Customize} = require("../models");
const cartRouter = express.Router();

cartRouter.post("/add", (req, res) =>{
//body me llega shirt customize
Cart_Item.create()
})

cartRouter.delete("/delete", (req,res) =>{

})

cartRouter.put("/edit", (req,res) =>{
    
})

module.exports = cartRouter;
