const express = require("express");
const { User, Shirt_Model } = require("../models");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  Shirt_Model.findAll()
    .then((products) => res.send(products))
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Shirt_Model.findOne({ where: { id } })
    .then((product) => res.send(product))
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.post("/", (req, res) => {
  Shirt_Model.bulkCreate(req.body)
    .then((product) => res.status(201).send(product))
    .catch((err) => console.log("error desde productRouter", err));
});

/*librosRouter.post("/", (req, res) => {
Libros.bulkCreate(req.body).then((libros) => res.status(201).send(libros));
}); */

productsRouter.put("/:id", (req, res) => {
  const { description, color, style, price, stock, size, image } = req.body;
  const { id } = req.params;
  Shirt_Model.update(
    { description, color, style, price, stock, size, image },
    { where: { id }, returning: true, plain: true }
  )
    .then((product) => res.send(product))
    .catch((err) => console.log("error desde productRouter", err));
});

productsRouter.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  Shirt_Model.destroy({ where: { id } })
    .then(() => res.sendStatus(202))
    .catch((err) => console.log("error desde productRouter", err));
});

module.exports = productsRouter;
