const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    products: [{
        id: mongoose.Types.ObjectId,
        quantity: Number
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    address: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    payment: {
        mode: {
            type: String,
            enum: ['COD', 'STRIPE'],
            require: true
        },
        amount: {
            type: Number
        },
        paymentRef: {
            type: String,
            require: true
        }
    },
    status: {
        type: String,
        enum: ['ORDERED', 'SHIPPED', 'IN TRANSIT', 'DELIVERED','FAILED', 'CANCELLED'],
        default: 'ORDERED',
    },
})

module.exports = new mongoose.model("orders", ordersSchema);