const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
const {isEmail} = require("validator");
const cartSchema = require("./cart");
const orders = require("./orders");
const address = require("./address");
const userSchema = new mongo.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [isEmail,"Please enter valid email"],
    },
    name: {
        type: String,
        required :true,
    },
    password: {
        type: String,
        required: true,
        minLength:[6,"password should be 6 letters and above"]
    },
    cart:{
        type: mongoose.Types.ObjectId,
        ref: cartSchema
    },
    address: [{
        type:mongoose.Types.ObjectId,
        ref:address
    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:orders
    }]
});

module.exports = mongo.model("user",userSchema);