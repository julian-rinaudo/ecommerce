const { User, Shirt_Model } = require("../models");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

exports.getUsers = (req, res) => {
    User.findAll({ where: { is_admin: false } }).then((result) =>
      res.send(result)
    );
  };

exports.registerUser = (req, res) => {

    const { first_name, last_name, email, password, is_admin } = req.body;
    User.create({ first_name, last_name, email, password, is_admin })
      .then((user) => res.status(201).send(user))
      .catch((err) => console.log("error al registrar el usuario", err));
  };


exports.loginUser = (req, res) => {
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
      console.log(payload)
    });
  });
};

exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    res.sendStatus(204);
  };

exports.updateUser = (req, res) => {
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
  };

exports.updateUserByEmail = (req, res) => {
    User.update(req.body, {
      where: {
        email: req.body.email,
      },
    })
      .then((user) => res.send(user))
      .catch((err) => console.log("error desde userEditRouter", err));
  };

exports.deleteUser = (req, res) => {
    User.destroy({
      where: {
        email: req.headers.email,
      },
    })
      .then(() => res.sendStatus(202))
      .catch((err) => console.log("error desde userEditRouter", err));
  };


/* exports.getMe = (validateAuth, (req, res) => {
  res.send(req.user);
});
 */