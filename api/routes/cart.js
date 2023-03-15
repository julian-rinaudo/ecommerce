const react = require("@heroicons/react");
const { RequestQuote } = require("@mui/icons-material");
const express = require("express");
const { Cart, Shirt_Customize, Shirt_Model, User } = require("../models");
const cartRouter = express.Router();

cartRouter.post("/add/:id", (req, res) => {
  const { quantity, url, data } = req.body;
  const { color, size, style } = data;
  const { id } = req.params;

  if (!id) {
    return res.status(401).send("Unauthorized");
  }

  Cart.findOrCreate({ where: { userId: id, state: "active" } })
    .then(([cart]) => {
      Shirt_Model.findOne({ where: { color, size, style } }).then((model) => {
        cart
          .createItem({
            urlImage: url,
            quantity,
          })
          .then((customizedShirt) => {
            customizedShirt.setModel(model);
            customizedShirt.setUser(id);
          });
      });
    })
    .then(() => res.status(201).send("item added to cart"))
    .catch((err) => console.log(err, "error adding to cart"));
});

cartRouter.delete("/delete/:id/:itemId", (req, res) => {
  const { id, itemId } = req.params;
  if (!id) {
    return res.status(401).send("Unauthorized");
  }
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      Shirt_Customize.findByPk(itemId).then((foundShirt) => {
        cart.removeItem(foundShirt).then(() => {
          foundShirt.destroy();
        });
      });
    })
    .then(() => res.status(200).send("Item removed from cart"))
    .catch((err) => console.log(err, "error removing from cart"));
});

cartRouter.put("/edit/:id/:itemId", (req, res) => {
  const { id, itemId } = req.params;
  const { quantity } = req.body;
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      cart.getItem({ where: { id: itemId } }).then((itemToUpdate) => {
        itemToUpdate[0].update({ quantity });
      });
    })
    .then(() => res.status(200).send("Item quantity updated"))
    .catch((err) => console.log(err, "error updating cart"));
});

// ruta checkout para cerrar el carrito activo

cartRouter.put("/checkout/:id", (req, res) => {
  const { id } = req.params;
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      cart.update({ state: "fulfilled" });
    })
    .then(() => res.status(200).send("Checkout complete"))
    .catch((err) => console.log(err, "error updating cart"));
});

// mostrar items del carrito actual

cartRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Cart.findOne({
    where: { userId: id, state: "active" },
    include: { model: Shirt_Customize, as: "item" },
  })
    .then((foundCartWithItems) => {
      res.status(200).send(foundCartWithItems);
    })
    .catch((err) => console.log(err, "error finding active cart"));
});

// mostrar items de carritos anteriores

cartRouter.get("/history/:id", (req,res)=>{
    const { id } = req.params;
    Cart.findAll({
        where: { userId: id, state: "fulfilled" },
        include: { model: Shirt_Customize, as: "item" },
      })
      .then((foundCarts) => {
        res.status(200).send(foundCarts);
      })
      .catch((err) => console.log(err, "error finding fulfilled carts"));
})

module.exports = cartRouter;

// checkoutRouter.get("/:id", (req, res) => {
//   const { id } = req.params;
//   Cart.findOne({
//     includes:{
//       model:
//     }
//   },{ where: { id } })
//     .then((cart) => res.send(cart))
//     .catch((err) => console.log("error desde checkoutRouter", err));
// });

// Cart.findOne({where:{
//     state: "active",
//     userId: id
//   }}).then((activeCart) =>{
//     if(!activeCart){
//         Cart.create({state:"active", userId: id})
//     }
//   })
