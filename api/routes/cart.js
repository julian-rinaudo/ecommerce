const react = require("@heroicons/react");
const { RequestQuote } = require("@mui/icons-material");
const express = require("express");
const { Cart, Shirt_Customize, Shirt_Model, User } = require("../models");
const cartRouter = express.Router();

cartRouter.post("/add/:id", (req, res) => {
  const { quantity, url, data } = req.body;
  const { color, size, style } = data;
  const { id } = req.params;

  if (!id) {
    return res.status(401).send("Unauthorized");
  }

  Cart.findOrCreate({ where: { userId: id } })
    .then(([cart]) => {
      Shirt_Model.findOne({ where: { color, size, style } }).then((model) => {
        cart
          .createItem({
            urlImage: url,
            quantity,
          })
          .then((customizedShirt) => {
            customizedShirt.setModel(model);
            customizedShirt.setUser(id);
          })
          .status(201)
          .send("item added to cart");
      });
    })
    .catch((err) => console.log(err, "error adding to cart"));
});

cartRouter.delete("/delete", (req, res) => {});

cartRouter.put("/edit", (req, res) => {});

module.exports = cartRouter;
