const express = require("express");
const { User, Shirt_Model } = require("../models");
const userRouter = express.Router();


const { generateToken } = require("../config/tokens");

userRouter.get("/", (req, res) => {
  User.findAll({ where: { is_admin: false } }).then((result) =>
    res.send(result)
  );
});


userRouter.post("/register", (req, res) => {
  const { first_name, last_name, email, password, is_admin } = req.body;
  User.create({ first_name, last_name, email, password, is_admin })
    .then((user) => res.status(201).send(user))
    .catch((err) => console.log("error al registrar el usuario", err));
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

userRouter.put("/:id", (req, res) => {
  const { first_name, last_name, email } = req.body;
  const { id } = req.params;
  User.update(
    { first_name, last_name, email },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err) => console.log("error desde userEditRouter", err));
});

userRouter.get("/me", (req, res) => {});

module.exports = userRouter;
