const { User, Shirt_Model, Shirt_Customize } = require("../models");
const sequelize = require("sequelize");

exports.getProducts = (req, res) => {
  Shirt_Model.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => console.log("Error desde productsController", error));
};

exports.getProductsByColorAndSize = (req, res) => {
  Shirt_Model.findAll({
    attributes: [
      "style",
      "description",
      [sequelize.fn("min", sequelize.col("price")), "minPrice"],
      [sequelize.fn("max", sequelize.col("price")), "maxPrice"],
      [
        sequelize.literal(
          "(SELECT image FROM shirt_models AS sm WHERE sm.style = shirt_model.style AND sm.color = 'white' LIMIT 1)"
        ),
        "image",
      ],
    ],
    group: ["style", "description"],
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

exports.getColorsForModel = (req, res) => {
  const { style } = req.params;
  Shirt_Model.findAll({
    where: { style: style },
    attributes: ["color"],
    group: ["color"],
  }).then((colorsFound) => {
    const colors = colorsFound.map((colorObj) => colorObj.color);
    res.send(colors);
  });
};

exports.getSizesForModel = (req, res) => {
  const { style } = req.params;
  Shirt_Model.findAll({
    where: { style: style },
    attributes: ["size"],
    group: ["size"],
  }).then((sizesFound) => {
    const sizes = sizesFound.map((sizeObj) => sizeObj.size);
    res.send(sizes);
  });
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
