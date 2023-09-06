const {Router}= require("express");
const {insertProduct} = require("../Controller/productHandler");

const router= Router();

router.post("/insertProduct",insertProduct);

module.exports=router;