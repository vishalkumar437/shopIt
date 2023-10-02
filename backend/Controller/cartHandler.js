const cartSchema = require("../schema/cart");
const productSchema = require("../schema/product");
const mongoose = require("mongoose");
const userSchema = require("../schema/user");
module.exports.addProductInCart = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const quantity = 1;
    try {
        // Find the user's cart
        const cart = await cartSchema.findOne({ userId: userId });
        const amount = await productSchema.findById(productId);
        if (cart === null) {
            // If cart doesn't exist, create a new one
            
            const newCart = await cartSchema.create({
                products: [{ id: productId, quantity: quantity }],
                userId: userId,
                amount:amount.price*quantity
            });
            const updatedUser = await userSchema.findOneAndUpdate(
                { _id: userId },
                { cart: newCart._id }, 
                { new: true }
            );
            return res.json(newCart);
        }

        // If cart already exists, check if productId exists
        const productIndex = cart.products.findIndex(item =>
            item.id.equals(new mongoose.Types.ObjectId(productId)));
        if (productIndex !== -1) {
            // If productId exists, update quantity
            cart.products[productIndex].quantity += quantity;
            cart.amount+=quantity*amount.price;
        } else {
            // If productId doesn't exist, add new entry
            cart.products.push({ id: productId, quantity: quantity });
            cart.amount += amount.price * quantity;
        }

        const updatedCart = await cart.save();
        return res.json(updatedCart);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports.updateProductQuantity = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const newQuantity = req.body.quantity;
    try {
        const cart = await cartSchema.findOne({ userId: userId });
        const amount = await productSchema.findById(productId);
        if (cart === null) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (newQuantity === 0) {
            const updatedCartWithRemovedProduct = await cartSchema.findOneAndUpdate(
                { userId: userId },
                { $pull: { products: { id: productId } } },
                { new: true }
            );

            return res.json(updatedCartWithRemovedProduct);
        }

        const updatedCart = await cartSchema.findOneAndUpdate(
            { userId: userId, 'products.id': productId },
            { $set: { 'products.$.quantity': newQuantity, 'amount':amount.price*newQuantity } },
            { new: true }
        );

        if (updatedCart === null) {
            console.log("not found")
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        return res.json(updatedCart);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports.getCart = async (req, res) => {
    const id = req.query.userId;
    cartSchema.find({ userId: id }).then((result) => {
        // console.log(result)
        res.status(200).send({
            cart: result[0]
        })
    }).catch((error) => {
        res.status(400).send({
            error: error
        })
    })
}
