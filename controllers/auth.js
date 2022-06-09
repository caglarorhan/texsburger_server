const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const e_p = require('../config')

exports.getSignUpForm = (req,res,next)=>{
    res.render('auth/signupform',{
        pageTitle: 'Sign Up Form',
        path: '/auth/signup',
    })
}

exports.postSignInForm = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let targetUser;
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            targetUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual =>{
            if(!isEqual){
                //console.log('password is not equal!')
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                email: targetUser.email,
                userId: targetUser._id.toString()
                },
                e_p('app','jwt_key').app.jwt_key,
                {expiresIn: '1h'}
                );
            //console.log('everythings ok, sending response!')
            res.status(200).json({token:token, userId: targetUser._id.toString()});
        })
        .catch(err=>{
            //console.log(err);
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })

}

exports.postSignUpForm = (req,res,next)=>{
    console.log('new user creating...');
    bcrypt
        .hash(req.body.password,12)
        .then(hashedPassword=>{
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                addresses:[],
                status:'registered'
            })
            user.save()
                .then(result=>{
                    res.status(201).json({message:'User created!', userId:result._id})
                })
                .catch(err=>{
                    console.log(err);
                })
        })
        .catch(err=>{
            if(!err.status){
        err.statusCode=500;
    }
            next(err)
        })

}

exports.getSignInForm = (req,res,next)=>{
    res.render('auth/signinform',{
        pageTitle: 'Sign In Form',
        path: '/auth/signin',
    })
}


