const mongoose = require("mongoose")
const userSchema = require("./user");
const cartSchema = new mongoose.Schema({
    products: [{
        id: mongoose.Types.ObjectId,
        quantity: Number
    }],
    userId:{
        type: mongoose.Types.ObjectId,
        ref: userSchema
    }
});

module.exports = mongoose.model("cartSchema",cartSchema);