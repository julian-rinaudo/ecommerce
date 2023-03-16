const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getProducts);

router.get("/styles", productsController.getProductsByColorAndSize);

router.get("/styles/:style/:color/:size", productsController.getShirtByStyleColorAndSize);

router.post("/shirtCustomized/:id", productsController.createShirtCustomized);

module.exports = router;
 


 
/* const express = require("express");
const { User, Shirt_Model, Shirt_Customize } = require("../models");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  Shirt_Model.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.get("/styles", (req, res) => {
  Shirt_Model.findAll({
    where: {
      color: "white",
      size: "M",
    },
  })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.get("/styles/:style/:color/:size", (req, res) => {
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
    .catch((error) => console.log("Error desde productRouter", error));
});

productsRouter.post("/shirtCustomized/:id", (req, res) => {
  const { data, url } = req.body;
  const { id } = req.params;
  User.findByPk(id).then((user) => {
    Shirt_Customize.create({ urlImage: url })
      .then((shirtCustom) => {
        shirtCustom.setUser(user.id);
        shirtCustom.setModel(data.id);
      })
      .then((err) => console.log("err desde productRouter", err));
  });
});

module.exports = productsRouter;

  */
