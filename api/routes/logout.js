const express = require('express');
const { User, Product } = require("../models");
const logoutRouter = express.Router();

logoutRouter.get('/',(req,res) => {
    //res.clearCookie("token");
})



module.exports = logoutRouter