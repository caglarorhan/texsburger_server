const express = require('express');
const router = express.Router();
const webhooksControllers = require('../controllers/webhook');

router.post('/', webhooksControllers.webhookPayments);

router.get('/', (req,res,next)=>{
    res.render('auth/signupform',{
        pageTitle: 'Sign Up Form',
        path: '/auth/signup',
    })
});

module.exports = router;
