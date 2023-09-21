const cartSchema = require("../schema/cart");


module.exports.addProductInCart = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const quantity = 1;

    // Find the user's cart
    const cart = await cartSchema.findOne({ userId: userId });

    if (cart === null) {
        // If cart doesn't exist, create a new one
        const newCart = await cartSchema.create({
            products: [{ id: productId, quantity: quantity }],
            userId: userId
        });
        return res.json(newCart);
    }

    // If cart already exists, update it
    const updatedCart = await cartSchema.findOneAndUpdate(
        { userId: userId },
        { $push: { products: { id: productId, quantity: quantity } } },
        { new: true }
    );
    return res.json(updatedCart);
};


module.exports.updateProductQuantity = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const newQuantity = req.body.quantity;

    try {
        const cart = await cartSchema.findOne({ userId: userId });

        if (cart === null) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedCart = await cartSchema.findOneAndUpdate(
            { userId: userId, 'products.id': productId },
            { $set: { 'products.$.quantity': newQuantity } },
            { new: true }
        );

        if (updatedCart === null) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        return res.json(updatedCart);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
