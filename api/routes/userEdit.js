const express = require('express');
const { User, Product } = require("../models");
const userEditRouter = express.Router();

userEditRouter.put('/',(req,res) => {
    const { id, first_name, last_name, email } = req.body
    User.update({first_name, last_name, email},{
        where:{id},returning:true,plain:true
    })
    .then(user => res.send(user))
    .catch(err => console.log('error desde userEditRouter',err))
})



module.exports = userEditRouter