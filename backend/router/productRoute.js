const {Router}= require("express");
const {insertProduct, getProductByCategory, getProductById, searchProductByName} = require("../Controller/productHandler");

const router= Router();

router.post("/insertProduct",insertProduct);
router.get("/products",getProductByCategory);
router.get("/product",getProductById);
router.post("/searchByName",searchProductByName);

module.exports=router;