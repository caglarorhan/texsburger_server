const e_p = require("../config");
const Stripe = require("stripe");
const SK=  e_p().app.stripe_secret_key;
const stripe = Stripe(SK);
const wh_secret = e_p().app.stripe_webhook_secret_key;


exports.webhookPayments = (req,res,next)=>{
let incomingData = req.body;
console.log('webhook icindeyiz')
//   console.log(incomingData)
//     // console.log(wh_secret)
//     // console.log(incomingData);
//     // console.log(`-------------------------------------
//     // ${req.headers['stripe-signature']}
//     // -------------------------------------------------
//     // `)
//
    console.log(`Webhook post request from Stripe arrived!`)
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        console.log(incomingData)
        event = stripe.webhooks.constructEvent(req, sig, wh_secret);
        console.log('event dogrulandi')
    } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
// // console.log(`Incoming data type:${incomingData.type}`);
// // // console.log(`Customer id:${incomingData.data.object.id}`)
// // // console.log(`Customer email:${incomingData.data.object.email}`)
// // // console.log(`Payment amount:${incomingData.data.object.amount_received}`)
// // // console.log(`Payment currency:${incomingData.data.object.currency}`)
// // // console.log(`Payment method:${incomingData.data.object.payment_method}`)
// // // console.log(`Payment method types:${incomingData.data.object.payment_method_types}`)
// // // console.log(`Shipping:${incomingData.data.object.shipping}`)
// // // console.log(`Status:${incomingData.data.object.status}`)
res.status(200).end()
}
