const mongo = require("mongoose");
const {isEmail} = require("validator");

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
        type: [],
    },
    address: {},
});

module.exports = mongo.model("user",userSchema);