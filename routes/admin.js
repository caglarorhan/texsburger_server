const express = require('express');
const adminControllers = require('../controllers/admin');
const router = express.Router();
const uploader = require('../middlewares/uploader');
 const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, adminControllers.getAdminDashPage);
router.get('/productCreationForm', isAuth, adminControllers.getProductCreationForm);
router.post('/productCreate', isAuth, uploader.single('productImage'), adminControllers.postProductCreate);
//router.post('/productCreate', uploader.array('uploadedImages',10), adminControllers.postProductCreate);

module.exports = router;

