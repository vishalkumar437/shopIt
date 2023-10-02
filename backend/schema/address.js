const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    addLine: {
        type: String,
        require: true,
        minLength: [6, "address should be 6 letters and above"]
    },
    pincode: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    phone:{
        type:String,
        require:true
    },
    state: {
        type: String,
        require: true,
    }
});

module.exports = new mongoose.model("address", addressSchema);