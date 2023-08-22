const {Router}= require("express");
const {sellerSignUp,sellerLogin} =require("../Controller/sellerHandler");

const router= Router();

router.post("/createseller",sellerSignUp);
router.post("/sellerLogin",sellerLogin);

module.exports=router;