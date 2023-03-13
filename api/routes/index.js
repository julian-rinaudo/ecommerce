const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const userEditRouter = require("./userEdit");
const userLogedRouter = require("./userLoged");

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/user/edit', userEditRouter);
router.use('/user/loged', userLogedRouter);


module.exports =  router
