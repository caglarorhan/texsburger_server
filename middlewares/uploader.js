const multer = require('multer');
const uuid = require('uuid');

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null,'public/images')
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

