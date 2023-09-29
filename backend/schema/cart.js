const mongoose = require("mongoose")
const userSchema = require("./user");
const { number } = require("prop-types");
const cartSchema = new mongoose.Schema({
    products: [{
        id: mongoose.Types.ObjectId,
        quantity: Number
    }],
    userId:{
        type: mongoose.Types.ObjectId,
    },
    amount:{
        type: Number
    }
});

module.exports = mongoose.model("cartSchema",cartSchema);