const { User, Shirt_Model, Shirt_Customize } = require("../models");

exports.getProducts = (req, res) => {
  Shirt_Model.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => console.log("Error desde productsController", error));
};

exports.getProductsByColorAndSize = (req, res) => {
    Shirt_Model.findAll({
      where: {
        color: "white",
        size: "M",
      },
    })
      .then((products) => {
        res.send(products);
      })
      .catch((error) => console.log("Error desde productsController", error));
  };

exports.getShirtByStyleColorAndSize = (req, res) => {
    const { style, color, size } = req.params;
    Shirt_Model.findOne({
      where: {
        color: color,
        style: style,
        size: size,
      },
    })
      .then((product) => {
        res.send(product);
      })
      .catch((error) => console.log("Error desde productsController", error));
  };

exports.createShirtCustomized = (req, res) => {
    const { data, url } = req.body;
    const { id } = req.params;
    User.findByPk(id).then((user) => {
      Shirt_Customize.create({ urlImage: url })
        .then((shirtCustom) => {
          shirtCustom.setUser(user.id);
          shirtCustom.setModel(data.id);
        })
        .then((err) => console.log("err desde productsController", err));
    });
  };