const express = require("express");
const { User, Product } = require("../models");
const productsUserRouter = express.Router();



productsUserRouter.post ("/", (req, res) => {
    const { color, size, design, price, stock, image } = req.body;
    Product.create({ color, size, design, price, stock,image })
      .then((product) => res.status(201).send(product))
      .catch((err) => console.log('error desde productRouter',err));
})



/* productsUserRouter.get ("/",(req, res)=>{
    Product.findAll()
    .then( products => res.send(products))
    .catch(error => console.log("Error desde productRouter", error))
}) */





module.exports =  productsUserRouter;
