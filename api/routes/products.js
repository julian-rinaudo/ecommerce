const express = require("express");
const { User, Shirt_Model } = require("../models");
const productsRouter = express.Router();

productsRouter.get("/styles", (req, res) => {
  Shirt_Model.findAll({
    where: {
      color: "white",
      size: "M",
    },
  })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.get("/styles/:style", (req, res) => {
  const { style } = req.params;
  Shirt_Model.findOne({
    where: {
      color: "white",
      style: style,
    },
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => console.log("Error desde productRouter", error));
});

module.exports = productsRouter;
