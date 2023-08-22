const mongo = require("mongoose");
const {isEmail} = require("validator");
const sellerSchema = new mongo.Schema({
        name:{
            type:String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate:[isEmail,"please enter a valid email"],
        },
        password: {
            type:String,
            required: true,
            minLength: [6,"6 length is minimum"],
        },
        product:{
            type:String,
        }
});

module.exports = mongo.model("seller",sellerSchema);