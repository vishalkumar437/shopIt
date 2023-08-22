const {Router}= require("express");
const {userSignUp,userLogin} =require("../Controller/userHandler");

const router= Router();

router.post("/createUser",userSignUp);
router.post("/userLogin",userLogin);

module.exports=router;