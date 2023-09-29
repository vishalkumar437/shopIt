const mongo = require("mongoose");

const productSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: [],
        required: true,
    },
    imageurl: {
        type: [],
    },
    seller: {
        type: {
            id: String,
            name: String
        }, required:true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
});

module.exports = mongo.model("product", productSchema);