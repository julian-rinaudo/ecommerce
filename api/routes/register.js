const express = require("express");
const { User, Product } = require("../models");
const registerRouter = express.Router();

registerRouter.post("/", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  User.create({ first_name, last_name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => console.log('error desde registerRouter',err));
});

module.exports = registerRouter;
