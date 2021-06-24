const express = require('express');
const productsController = require('../controllers/products');
const isAuth = require('../middlewares/is-auth');
const router = express.Router();


router.get('/', (req,res,next)=>{
    res.render('product/products',{pagePath:'/products'})
});
router.get('/page/:pageNumber', productsController.getProductsList);
router.get('/product/:pid',productsController.getProductDetails)

module.exports = router;
