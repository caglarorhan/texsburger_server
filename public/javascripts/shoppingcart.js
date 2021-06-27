window.addEventListener('load',()=>{

    if(!window.hasOwnProperty(texsBurger)){
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
        let cartProducts = texsBurger.shoppingCart.products
        if(!cartProducts[prod.pid]){
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

})









