const express = require("express");
const { User, Shirt_Model } = require("../models");
const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => res.cookie("user", user))
    .then(() => res.send("todo okey"));





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

module.exports = loginRouter;
