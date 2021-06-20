const dotenv = require('dotenv');
dotenv.config();

const envValues =(variable)=>{
    return process.env[variable]
}

module.exports=envValues;
