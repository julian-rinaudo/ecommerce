const express = require("express");
const { User, Shirt_Model } = require("../models");
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  User.create({ first_name, last_name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => console.log("error desde userRouter", err));
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    res.cookie("user", user);
    res.send(user);
  });

  //     User.findOne({ where: { email } }).then((user) => {
  //       if (!user) return res.sendStatus(401);
  //       user.validatePassword(password).then((isValid) => {
  //         if (!isValid) return res.sendStatus(401);

  //         const payload = {
  //           email: user.email,
  //           name: user.name,
  //           lastname: user.lastname,
  //         };

  //         const token = generateToken(payload);

  //         res.cookie("token", token);

  //         res.send(payload);
  //       });
  //     });
  //   })
});

userRouter.post("/logout", (req, res) => {});

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
