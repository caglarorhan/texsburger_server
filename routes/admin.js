const express = require('express');
const adminControllers = require('../controllers/admin');
const router = express.Router();
const uploader = require('../middlewares/uploader')

router.get('/', adminControllers.getAdminDashPage);
router.get('/productCreationForm', adminControllers.getProductCreationForm);
router.post('/productCreate', uploader.single('productImage'), adminControllers.postProductCreate);
//router.post('/productCreate', uploader.array('uploadedImages',10), adminControllers.postProductCreate);

module.exports = router;

