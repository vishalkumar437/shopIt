const {Router}= require("express");
const {insertProduct, getProductByCategory} = require("../Controller/productHandler");

const router= Router();

router.post("/insertProduct",insertProduct);
router.get("/products",getProductByCategory);

module.exports=router;