const dotenv = require('dotenv');
const cart = require('../schema/cart');
const product = require('../schema/product');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);


module.exports.stripeHandler = async (req, res) => {
    const cartId = req.body.cartId;
    const address = req.body.address;
    const cartItems = await cart.findById(cartId);
    const line_items = await Promise.all(cartItems.products.map(async (productId) => {
        const prod = await product.findById(productId.id);
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: prod.name
                },
                unit_amount: prod.price * 100,
            },
            quantity: productId.quantity
        }
    }));
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.MY_DOMAIN}/success`,
        cancel_url: `${process.env.MY_DOMAIN}/cancel`,
    })
    res.send({
        sessionId: session.id
    });
}
