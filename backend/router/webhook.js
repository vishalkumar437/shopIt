const express = require("express");
const router = express.Router();
const {webHookController} = require("../Controller/webhookHandler");

router.post("/webhook",express.json({ type: "application/json" }),webHookController);

module.exports = router;