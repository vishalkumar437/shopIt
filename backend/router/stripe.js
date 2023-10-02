const express = require('express');
const app = express();
app.use(express.static('public'));
const {stripeHandler} = require("../Controller/stripeHandler");
const router =express.Router();

router.post('/stripe/create-checkout-session', stripeHandler);

module.exports = router;