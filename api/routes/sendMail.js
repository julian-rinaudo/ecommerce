const express = require("express");
const { Cart, User, Shirt_Customize } = require("../models");
const sendMailRouter = express.Router();
const  transporter  = require ("../config/mailer");

sendMailRouter.get("/mailer/:id", (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id } })
    .then((user) => {
      return transporter.sendMail({
        from: "<CustomShirt@empresa.com>",
        to: user.email,
        subject: "Estas a un pasito de hacer tu compra!!!!",
        text: "Confirma tu compra",
        html: "<button>Confirma tu compra</button>",
      });
    }).then(() => res.send('email sent succesfully'))
    .catch((err) => console.log("error desde sendMailRouter", err));
});

module.exports = sendMailRouter;
