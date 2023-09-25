const {Router} = require("express");
const {addProductInCart,getCart} = require("../Controller/cartHandler");
const router = Router();

router.put("/addtocart",addProductInCart);
router.get("/getcart",getCart);

module.exports = router;