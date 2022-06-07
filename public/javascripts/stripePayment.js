            let stripeCardStyle = {
                base: {
                    color: "#32325d",
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#32325d"
                    }
                },
                invalid: {
                    fontFamily: 'Arial, sans-serif',
                    color: "#fa755a",
                    iconColor: "#fa755a"
                }
            };

const goStripeGo = (amount)=>{
    let usersTexsBurger = JSON.parse(localStorage.getItem('texsBurger'));
    let usersCart = usersTexsBurger.shoppingCart.products;
        let paymentIntents = fetch("/paymentintents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            paymentTypes:["card"],
            amount: amount,
            currency:'usd',
            shoppingCart: JSON.stringify(usersCart)
        })
    });
        paymentIntents.then(result=>{
            return result.json();
        })
            .then(data=>{
                //console.log(data);
                const stripe = Stripe(data.publishableKey);
                const stripePaymentForm = document.getElementById("payment-form");
                const totalAmount = document.getElementById('totalAmount');
                const stripeElements = stripe.elements();
                const stripeCardElement = stripeElements.create('card', {style:stripeCardStyle});
                stripeCardElement.mount('#card-element');
                totalAmount.textContent = 'Total amount: '+data.totalAmount+'$';
                //----------------------------------------
                stripeCardElement.on("change", function (event) {
                    // Disable the Pay button if there are no card details in the Element
                    document.querySelector("button").disabled = event.empty;
                    document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
                });

                stripePaymentForm.addEventListener("submit", function(event) {
                    event.preventDefault();
                    // Complete payment when the submit button is clicked
                    payWithCard(stripe, stripeCardElement, data.clientSecret);
                });
            })
}
const payWithCard = function(stripe, card, clientSecret) {
    loading(true);
    stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: card
            }
        })
        .then(function(result) {
            if (result.error) {
                // Show error to your customer
                showError(result.error.message);
            } else {
                // The payment succeeded!
                //console.log(result.paymentIntent.status);
                //console.log(result.paymentIntent.status==="succeeded");
                orderComplete(result.paymentIntent.id);
            }
        });
};
//==================== HELPERS
const orderComplete = function(paymentIntentId) {
    loading(false);
    document
        .querySelector(".result-message a")
        .setAttribute(
            "href",
            "https://dashboard.stripe.com/test/payments/" + paymentIntentId
        );
    document.querySelector(".result-message").classList.remove("hidden");
    document.querySelector("button").disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function() {
        errorMsg.textContent = "";
    }, 4000);
};

// Show a spinner on payment submission
var loading = function(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
};
