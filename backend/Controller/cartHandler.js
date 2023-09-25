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


module.exports.getCart = async (req,res)=>{
    const id = req.query.userId;
    console.log(id)
    cartSchema.find({userId:id}).then((result)=>{
        console.log(result)
        res.status(200).send({
            cart:result
        })
    }).catch((error)=>{
        res.status(400).send({
            error:error
        })
    })
}
