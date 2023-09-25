const {Router}= require("express");
const {insertProduct, getProductByCategory, getProductById} = require("../Controller/productHandler");

const router= Router();

router.post("/insertProduct",insertProduct);
router.get("/products",getProductByCategory);
router.get("/product",getProductById);

module.exports=router;