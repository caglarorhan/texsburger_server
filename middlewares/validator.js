const {body,validationResult} = require('express-validator');
const User = require('../models/user');

exports.userValidator =[
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value,{req})=>{
            return User.findOne({email:value}).then(userDoc=>{
                if(userDoc){
                    return Promise.reject('Email address already exist!')
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min:5})
        .withMessage('Password length must greater then 5!')
        .custom((value,{req})=>{
            if(value!==req.body.password_2){
                throw new Error('Password confirmation doesn\'t match password!')
            }
            return true;
        }),
    body('first_name')
        .not()
        .isEmpty(),
    body('last_name')
        .not()
        .isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
]

exports.productValidator=[
    body('productName'),
    body('productPrice'),
    body('productDescription'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
]
