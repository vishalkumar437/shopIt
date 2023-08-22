const mongo = require("mongoose");

const productSchema = new mongo.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageurl:{
        type: String,
    },
    seller:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required:true,
    },
    stock:{
        type: Number,
        required:true,
    }
});

module.exports = mongo.model("product",productSchema);