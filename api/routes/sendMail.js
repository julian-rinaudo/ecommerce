const express = require("express");
const sendMailController = require("../controllers/sendMailController");
const sendMailRouter = express.Router();

sendMailRouter.get("/mailer/:id", sendMailController.sendMail);

module.exports = sendMailRouter;




/* const express = require("express");
const { Cart, User, Shirt_Customize } = require("../models");
const sendMailRouter = express.Router();
const transporter = require("../config/mailer");

sendMailRouter.get("/mailer/:id", (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id } })
    .then((user) => {
      Cart.findOne({
        where: { userId: id, state: "active" },
      })
        .then((foundCartWithItems) => {
          return transporter.sendMail({
            from: "<CustomShirt@empresa.com>",
            to: user.email,
            subject: "Aqui tienes tu detalle de la compra!!!!",
            text: "Confirma tu compra",
            html: `
              <h1>Hola ${user.first_name}!!</h1>
              <h2>Gracias por tu compra</h2>
              <h3>Total pagado: ${foundCartWithItems.totalCost}</h3>
              `
          });
        }).then(() => res.send('Your order is completed!'))
        .catch((err) => console.log(err, "error finding active cart"));
    })
});

module.exports = sendMailRouter; */
