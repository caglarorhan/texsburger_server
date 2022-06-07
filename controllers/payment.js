const Product = require("../models/product");
const Stripe = require("stripe");
const e_p = require("../config");
const SK=  e_p().app.stripe_secret_key;
const PK=  e_p().app.stripe_publishable_key;
const stripe = Stripe(SK);


exports.paymentIntent = async (req,res)=>{
        const {paymentTypes, currency, amount, shoppingCart} = req.body;
        const shoppingCartObj = JSON.parse(shoppingCart);
        let totalCartPayable =0;
        let totalCartPayableServerSide = 0;
        const productsInCart = await Product.find({_id:{$in:Object.keys(shoppingCartObj)}}).then(data=>{
            data.forEach(itemOnServer=>{
                //console.log(itemOnServer);
                let itemOnCart = shoppingCartObj[itemOnServer._id]
                totalCartPayableServerSide+=(itemOnServer.productPrice * itemOnCart.amount);
            })
        })
        Object.keys(shoppingCartObj).forEach(key=>{
            totalCartPayable+=(shoppingCartObj[key].unit_price*shoppingCartObj[key].amount)
        })
        if(totalCartPayable!==totalCartPayableServerSide){
            const error = new Error('Calculated payable amount is wrong! Try to clear your cart and add items again.');
            error.statusCode =401;
            throw error;
        }else{
            try{
                const result = await stripe.paymentIntents.create({
                    amount: amount,
                    currency:currency,
                    payment_method_types:[...paymentTypes]
                });
// console.log(`----------------------------------
// payment intetn alinmis olmali,
// ${JSON.stringify(result)}
// ---------------------------------------`)
                res.send(JSON.stringify({clientSecret:result.client_secret, publishableKey:PK, totalAmount:totalCartPayableServerSide}));
            }catch(err){
                res.status(400).send({error:{message:err.message}})
            }
        }
}
