const {Router}= require("express");
const {userSignUp,userLogin, getUser} =require("../Controller/userHandler");

const router= Router();

router.post("/createUser",userSignUp);
router.post("/userLogin",userLogin);
router.get("/getUser/:id",getUser);

module.exports=router;