const {Router} = require("express");
const {addProductInCart,getCart, updateProductQuantity} = require("../Controller/cartHandler");
const router = Router();

router.put("/addtocart",addProductInCart);
router.get("/getcart",getCart);
router.post("/updateProductQuantity",updateProductQuantity)

module.exports = router;