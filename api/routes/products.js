const express = require("express");
const { User, Product } = require("../models");
const productsRouter = express.Router();


productsRouter.get ("/",(req, res)=>{
    Product.findAll()
    .then( products => res.send(products))
    .catch(error => console.log("Error desde productRouter", error))
})

productsRouter.post ("/", (req, res) => {
    const { color, size, design, price, stock, image } = req.body;
    Product.create({ color, size, design, price, stock,image })
      .then((product) => res.status(201).send(product))
      .catch((err) => console.log('error desde productRouter',err));
})

productsRouter.put ("/:id", (req, res)=>{
    const { color, size, design, price, stock, image } = req.body;  
    const {id} = req.params  
    Product.update({ color, size, design, price, stock, image }, {where:{id},returning:true,plain:true})
    .then(product => res.send(product))
    .catch((err) => console.log('error desde productRouter',err));
})

productsRouter.delete("/remove/:id", (req, res) => {
    const {id} = req.params  
    Product.destroy ({where:{id}})
    .then(() => res.sendStatus(202))
    .catch((err) => console.log('error desde productRouter',err));
})



module.exports = productsRouter

