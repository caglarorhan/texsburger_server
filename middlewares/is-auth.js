const jwt = require('jsonwebtoken');
const e_p = require('../config');

module.exports = (req, res, next)=>{
    let decodedToken;
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated-1!');
        error.statusCode =401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    try{
        decodedToken = jwt.verify(token, e_p().app.jwt_key);
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated-2!');
        error.statusCode = 401;
        throw error;
    }
    req.userIdFromToken = decodedToken.userId;
    next();
}
