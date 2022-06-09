const express = require('express');
const adminControllers = require('../controllers/admin');
const router = express.Router();
const uploader = require('../middlewares/uploader');
const isAuth = require('../middlewares/is-auth');
const validator = require('../middlewares/validator');

router.get('/', adminControllers.getAdminDashPage);
router.get('/productCreationForm', adminControllers.getProductCreationForm);
router.get('/products', adminControllers.getProducts);
router.delete('/product/:pid', adminControllers.deleteProduct);
router.put('/productUpdate', isAuth, uploader.single('productImage'), adminControllers.putProductUpdate);
router.post('/productCreate', isAuth, uploader.single('productImage'), adminControllers.postProductCreate);
//router.post('/productCreate', uploader.array('uploadedImages',10), adminControllers.postProductCreate);

module.exports = router;

