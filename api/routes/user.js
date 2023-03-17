const express = require("express");
const userController = require("../controllers/userController");
const { validateAuth } = require("../middlewares/auth");


const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);

userRouter.post("/logout", userController.logoutUser);

userRouter.put("/:id", userController.updateUser);

userRouter.put("/", userController.updateUserByEmail);

userRouter.delete("/", userController.deleteUser);

//userRouter.get("/me", userControllers.getMe);
// tuve que dejar la ruta me en este  contexto y no en controllers
// porque era la única que se rompía

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;


//////////////////////////////////////////////////////////////////

/* 
const express = require("express");
const { User, Shirt_Model } = require("../models");
const userRouter = express.Router();

const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

userRouter.get("/", (req, res) => {
  User.findAll().then((result) => res.send(result));
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
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_admin: user.is_admin,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
      console.log(payload);
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

userRouter.put("/", (req, res) => {
  User.update(req.body, {
    where: {
      email: req.body.email,
    },
  })
    .then((user) => res.send(user))
    .catch((err) => console.log("error desde userEditRouter", err));
});

userRouter.delete("/", (req, res) => {
  User.destroy({
    where: {
      email: req.headers.email,
    },
  })
    .then(() => res.sendStatus(202))
    .catch((err) => console.log("error desde userEditRouter", err));
});

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;


 */