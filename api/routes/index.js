const express = require("express");
const router = express.Router();

router.get('/',(req,res) => {
   res.send('cambiando develop probando nuevo pull')
})


module.exports =  router
