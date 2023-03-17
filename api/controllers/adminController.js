const { User, Shirt_Model } = require("../models");


exports.getProductById = (req, res) => {
  Shirt_Model.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => console.log("Error desde adminController", error));
};


exports.createProduct = (req, res) => {
  Shirt_Model.bulkCreate(req.body)
    .then((product) => res.status(201).send(product))
    .catch((err) => console.log("error desde adminController", err));
};


exports.updateProduct = (req, res) => {
  const { description, color, style, price, stock, size, image } = req.body;
  const { id } = req.params;
  Shirt_Model.update(
    { description, color, style, price, stock, size, image },
    { where: { id }, returning: true, plain: true }
  )
    .then((product) => res.send(product))
    .catch((err) => console.log("error desde adminController", err));
};


exports.deleteProductById = (req, res) => {
  const { id } = req.params;
  Shirt_Model.destroy({ where: { id } })
    .then(() => res.sendStatus(202))
    .catch((err) => console.log("error desde adminController", err));
};
