const multer = require('multer');
const uuid = require('uuid');
const e_p = require('../config');

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null,e_p().app.image_storage)
        },
        filename: (req, file, cb)=>{
            cb(null, uuid.v4()+'_'+file.originalname)
        }
    })

    const fileFilter = (req, file, cb)=>{
        const fileTypes = ['image/png','image/jpg','image/jpeg'];
        if(fileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }

    module.exports = multer({storage: fileStorage})

