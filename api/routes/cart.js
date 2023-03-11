const express = require("express");
const { Cart, Cart_Item, Shirt_Customize} = require("../models");
const cartRouter = express.Router();

cartRouter.post("/add", (req, res) =>{

const {style, color, size} = req.body;

})

cartRouter.delete("/delete", (req,res) =>{

})

cartRouter.put("/edit", (req,res) =>{
    
})

module.exports = cartRouter;
