const express = require("express");
const router = express.Router();

const registerRouter = require("./register");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const userEditRouter = require("./userEdit");
const userLogedRouter = require("./userLoged");
const productsAdminRouter = require("./products");
const productsUserRouter = require("./productsUser");

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/user/edit', userEditRouter);
router.use('/user/loged', userLogedRouter);
router.use('/products', productsAdminRouter);
router.use('/products/user', productsUserRouter);


module.exports =  router
