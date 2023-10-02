const {newOrder} = require("../Controller/ordersHandler");
const {Router} = require("express");
const router = Router();

router.post("/newOrder",newOrder)

module.exports = router