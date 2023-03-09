const express = require('express');
const { User, Shirt_Model } = require("../models");
const logoutRouter = express.Router();

logoutRouter.get('/',(req,res) => {
    //res.clearCookie("token");
})



module.exports = logoutRouter