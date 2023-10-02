const orders = require("../schema/orders");
const mongoose = require("mongoose");
const addressSchema = require("../schema/address");
const userSchema = require("../schema/user");
const cartSchema = require("../schema/cart");

function generateUniqueReference() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // You can adjust this range as needed
    
    return `${timestamp}-${random}`;
  }

module.exports.newOrder = async (req, res) => {
    const address = req.body.address;
    const paymentMethod = req.body.paymentMethod;
    const cartId = req.body.cartId;
    try {
        let addressResponse = await addressSchema.create({
            fullName: address.fullName,
            userId: address.userId,
            addLine: address.address,
            pincode: address.pincode,
            city: address.city,
            phone: address.phone,
            state: address.state,
        })
        const user = await userSchema.findOneAndUpdate(
            { _id: address.userId },
            { $push: { address: addressResponse._id } }, 
            { new: true }
        );

        // For COD
        if(paymentMethod=='COD'){
            const cart =await cartSchema.findById(cartId);
            const ordersResponse = await orders.create({
                products:cart.products,
                userId:address.userId,
                address:addressResponse._id,
                payment:{mode:'COD',amount:cart.amount,paymentRef:'COD'+generateUniqueReference()},
                status:'ORDERED',
            }).then((result)=>{
                cartSchema.findByIdAndRemove(cartId).then(()=>{
                    console.log(cartId+" deleted successfully");
                })
                res.status(200).send({
                    response:"order successfull",
                })
            })
        }

        if(paymentMethod==='stripe'){
            
        }

    }
    catch (error) {
        res.status(500).send({
            error:error
        })
    }

}