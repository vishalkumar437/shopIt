module.exports.webHookController = async (req, res) => {
    const event = req.body;
    // Handle the event
    console.log("webhhookk");   
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // yourFunction(session);
        console.log("Calling my Funcion")
    }

    res.json({ received: true });
}