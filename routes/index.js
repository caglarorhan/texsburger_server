const express = require('express');
const router = express.Router();
const e_p = require('../config')();
console.log(e_p.app.stripe_publishable_key)

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    pagePath: '/',
    title:'TexsBurger Home Page',
    publishableKey: e_p.app.stripe_publishable_key
  });
});

module.exports = router;
