const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');
const validator = require('../middlewares/validator');


router.get('/signup', authControllers.getSignUpForm);
router.post('/signup',validator.userValidator, authControllers.postSignUpForm)
router.get('/signin', authControllers.getSignInForm);
router.post('/signin', authControllers.postSignInForm);


module.exports = router;
