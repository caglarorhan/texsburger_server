const express = require('express');
const router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
    res.send('product list here.');
});

router.get('/',(req,res,next)=>{

})

module.exports = router;
