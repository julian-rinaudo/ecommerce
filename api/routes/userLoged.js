const express = require('express');
const { User, Product } = require("../models");
const userLogedRouter = express.Router();

userLogedRouter.get('/',(req,res) => {
    
})

module.exports = userLogedRouter