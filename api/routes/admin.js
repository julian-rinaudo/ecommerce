const express = require("express");
const { User, Shirt_Model } = require("../models");
const adminRouter = express.Router();

adminRouter.post("/", (req, res) => {
  Shirt_Model.bulkCreate(req.body)
    .then((product) => res.status(201).send(product))
    .catch((err) => console.log("error desde productRouter", err));
});

adminRouter.put("/:id", (req, res) => {
  const { description, color, style, price, stock, size, image } = req.body;
  const { id } = req.params;
  Shirt_Model.update(
    { description, color, style, price, stock, size, image },
    { where: { id }, returning: true, plain: true }
  )
    .then((product) => res.send(product))
    .catch((err) => console.log("error desde productRouter", err));
});

adminRouter.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  Shirt_Model.destroy({ where: { id } })
    .then(() => res.sendStatus(202))
    .catch((err) => console.log("error desde productRouter", err));
});

module.exports = adminRouter;
