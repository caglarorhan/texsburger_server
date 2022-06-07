window.addEventListener('load',()=>{

    if(!window.hasOwnProperty('texsBurger')){
        window.texsBurger ={
            age: new Date().getTime(),
            shoppingCart:{
                user_id:'',
                products:{},
                totalPrice:0
            }
        }
    }
    if(!texsBurger.age){
        texsBurger.age = new Date().getTime();
    }

    if(!texsBurger.shoppingCart){
        texsBurger.shoppingCart = {
            user_id:'',
            products:{},
            totalPrice:0
        }
    }

    if(!localStorage.getItem('texsBurger')){
        localStorage.setItem('texsBurger',JSON.stringify(texsBurger))
    }else{
        let texsBurgerTemp = JSON.parse(localStorage.getItem('texsBurger'));
        texsBurger.age = texsBurgerTemp.age;
        texsBurger.shoppingCart = texsBurgerTemp.shoppingCart;
    }

    texsBurger.updateShoppingCartWithProducts=(prod={})=>{
        let cartProducts = texsBurger.shoppingCart.products;
        if(!cartProducts[prod.pid] && prod.pCount>0){
            console.log(`bu urun yok`)
            cartProducts[prod.pid] = {
                product_name:prod.pName,
                unit_price:parseFloat(prod.pPrice),
                amount:prod.pCount
            };
        }else{
            if(prod.pCount<1){
                delete cartProducts[prod.pid]
            }else{
                cartProducts[prod.pid].amount = prod.pCount;
            }
        }
        localStorage.setItem('texsBurger',JSON.stringify(texsBurger));
        texsBurger.updateVisualShoppingCart();
        console.log(texsBurger);
    }

    texsBurger.updateProductsWithShoppingCart =()=>{
        let cartProducts = texsBurger.shoppingCart.products
        const productsContainerOnThePage = document.getElementById("productList");
        const productItemsOnThePage = productsContainerOnThePage.querySelectorAll("[data-pid]");
        productItemsOnThePage.forEach(productOnPage=>{
            let pageProdPid = productOnPage.dataset.pid.toString();
            if(cartProducts[`${pageProdPid}`]){
                productOnPage.querySelector("[name=orderAmount]").value = cartProducts[`${pageProdPid}`].amount;
            }
        })
    }

    texsBurger.updateVisualShoppingCart = ()=>{
        console.log('Visual cart populating');
        let visualShoppingCart = document.getElementById('shoppingCart');
        visualShoppingCart.innerHTML='<h4 style="text-align:center; margin-top:5px; margin-bottom:5px;">SHOPPING CART</h4>';
        //
        let localStorageData = JSON.parse(localStorage.getItem('texsBurger'));
        let products = localStorageData.shoppingCart.products;
        let totalCheckoutAmount=0;

        Object.keys(products).forEach(productId=>{
            let product = products[productId];
            let newItemForVisualShoppingChart = document.createElement('div');
            let aSpanName = document.createElement('span');
            let aSpanAmount = document.createElement('span');
            //
            aSpanAmount.style.cssText=`margin-left:auto;`;
            //
            aSpanName.innerHTML=product.product_name;
            newItemForVisualShoppingChart.append(aSpanName);
            aSpanAmount.innerHTML = product.amount;
            newItemForVisualShoppingChart.append(aSpanAmount);
            visualShoppingCart.append(newItemForVisualShoppingChart);
            totalCheckoutAmount+=(product.amount*product.unit_price);
        })

        let totalPriceForCheckoutDiv = document.createElement('div');
        visualShoppingCart.append(totalPriceForCheckoutDiv);
        totalPriceForCheckoutDiv.style.cssText=`display:flex; margin-top:auto; flex-direction:row; border-top:1px solid black; padding-top:10px; padding-bottom:5px; margin-bottom:5px;`;
        totalPriceForCheckoutDiv.innerHTML=`<div style="">Total:</div><div style="margin-left:auto" id="checkoutTotal">$0</div>`;
        let checkoutButton = document.createElement('button');
        visualShoppingCart.append(checkoutButton);
        checkoutButton.textContent='CHECKOUT';
        checkoutButton.addEventListener('click',texsBurger.checkoutModalShoppingSummary);

        document.getElementById("checkoutTotal").innerHTML = '$'+ totalCheckoutAmount;

        //
        document.getElementById('itemTypeCounts').innerHTML = Object.keys(products).length.toString();

    }

    texsBurger.checkoutModalShoppingSummary =()=>{

        let shoppingCartSummaryModalWindow = modalWindowCreator({id:'sCSMW', width:500, height:500, ingredient:'<h3>Checkout Summary</h3>'});
        shoppingCartSummaryModalWindow.querySelector('div').innerHTML='<h3>Checkout Summary</h3>';

        let localStorageData = JSON.parse(localStorage.getItem('texsBurger'));
        let products = localStorageData.shoppingCart.products;
        let totalCheckoutAmount=0;
        //
        Object.keys(products).forEach(productId=>{
            let product = products[productId];
            let newItemForCheckoutSummary = document.createElement('div');
            newItemForCheckoutSummary.style.cssText='display:flex; justify-content:space-between; width:100%; text-align:left; padding:4px; font-size:16px'
            let aSpanName = document.createElement('span');
            let aSpanPrice = document.createElement('span');
            let aSpanAmount = document.createElement('span');
            //
            newItemForCheckoutSummary.querySelectorAll('span').forEach(sp=>{
                sp.style.cssText=`font-weight:bold; min-width:40px`
            })

            //
            aSpanName.innerHTML=product.product_name;
            newItemForCheckoutSummary.append(aSpanName);
            aSpanPrice.style.cssText=`margin-left:auto; margin-right:100px;`;
            aSpanPrice.innerHTML='$'+product.unit_price;
            newItemForCheckoutSummary.append(aSpanPrice);
            aSpanAmount.innerHTML = 'x'+product.amount;
            newItemForCheckoutSummary.append(aSpanAmount);
            shoppingCartSummaryModalWindow.querySelector('div').append(newItemForCheckoutSummary);
            totalCheckoutAmount+=(product.amount*product.unit_price);
        })
        let orderTotal = document.createElement('div');
        orderTotal.style.cssText=`width:100%;text-align:right; margin-top:auto; border-top:1px solid grey; padding-top:5px;`;
        orderTotal.innerHTML=`Total : $${totalCheckoutAmount}`;
        shoppingCartSummaryModalWindow.querySelector('div').append(orderTotal);
        let checkoutButton = document.createElement('button');
        checkoutButton.textContent='CHECKOUT';
        shoppingCartSummaryModalWindow.querySelector('div').append(checkoutButton);
        checkoutButton.addEventListener('click',()=>{
            //--
            shoppingCartSummaryModalWindow.querySelector('.modal-content').innerHTML=`
<h3>Please Provide Payment Information</h3>
                <form id="payment-form" style="display: flex; flex-direction: column; flex-wrap: wrap">
                    <div id="card-element" style="display: block"><!--Stripe.js injects the Card Element--></div>
                    <div id="totalAmount" style="display: block; text-align: right">0$</div>
                        <button id="payment-submit">
                        <div class="spinner hidden" id="spinner"></div>
                        <span id="button-text">Pay now</span>
                        </button>
                    <p id="card-error" role="alert"></p>
                    <p class="result-message hidden">
                    Payment succeeded, see the result in your
                    <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
                    </p>
                </form>
            `;
goStripeGo(totalCheckoutAmount*100);
        })
        // after ingredient addded
        shoppingCartSummaryModalWindow.switch('on')
    }

    document.getElementById('shoppingCartImage').addEventListener('click',()=>{
        let sC = document.getElementById('shoppingCart');
        sC.style.display = (sC.style.display==='none')?'flex':'none';
    })
    texsBurger.updateVisualShoppingCart()
})









