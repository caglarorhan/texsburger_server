const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV; // 'development' | 'test' | 'production'
console.log(`You are running on ${env} mode!`);

const configObject = {
    development:{
        app: {
            port: parseInt(process.env.DEVELOPMENT_APP_PORT) || 3000,
            jwt_key:process.env.DEVELOPMENT_JWT_SECRETKEY || '',
            image_storage:process.env.DEVELOPMENT_IMAGE_STORAGE,
            stripe_publishable_key: process.env.DEVELOPMENT_STRIPE_API_PUBLISH_KEY,
            stripe_secret_key: process.env.DEVELOPMENT_STRIPE_API_SECRET_KEY,
            stripe_webhook_secret_key: process.env.STRIPE_WEBHOOK_SECRET

        },
        db: {
            mongo_db_connection: process.env.DEVELOPMENT_MONGODB_CONNECTION || ''
        },
        fs:{
            static_folders: process.env.DEVELOPMENT_STATIC_FILE_FOLDERS || 'static'
        }
    },
    test:{
        app: {
            port: parseInt(process.env.TEST_APP_PORT) || 3000,
            jwt_key:process.env.TEST_JWT_SECRETKEY || '',
            image_storage:process.env.TEST_IMAGE_STORAGE,
            stripe_publishable_key: process.env.TEST_STRIPE_API_PUBLISH_KEY,
            stripe_secret_key: process.env.TEST_STRIPE_API_SECRET_KEY,
            stripe_webhook_secret_key: process.env.STRIPE_WEBHOOK_SECRET
        },
        db: {
            mongo_db_connection: process.env.TEST_MONGODB_CONNECTION || ''
        },
        fs:{
            static_folders: process.env.TEST_STATIC_FILE_FOLDERS || 'static'
        }
    },
    production: {
        app: {
            port: parseInt(process.env.PRODUCTION_APP_PORT) || 3000,
            jwt_key:process.env.PRODUCTION_JWT_SECRETKEY || '',
            image_storage:process.env.PRODUCTION_IMAGE_STORAGE,
            stripe_publishable_key: process.env.PRODUCTION_STRIPE_API_PUBLISH_KEY,
            stripe_secret_key: process.env.PRODUCTION_STRIPE_API_SECRET_KEY,
            stripe_webhook_secret_key: process.env.STRIPE_WEBHOOK_SECRET
        },
        db: {
            mongo_db_connection: process.env.PRODUCTION_MONGODB_CONNECTION || ''
        },
        fs:{
            static_folders: process.env.PRODUCTION_STATIC_FILE_FOLDERS || 'static'
        }
    }

}

const envValues =(options={isPromise:false})=>{
    //console.log(configObject[env][variable_group],)
    if(options.isPromise){
        return new Promise((res,rej)=>{
                if(configObject[env]){
                    res(configObject[env]);
                }else{
                    rej('Configuration data is not exist!')
                }
            }
        );
    }else{
        return configObject[env]
    }
}
/*
Usage in other files
const e_p = require('config');
const PK_TEST=  e_p().test.app.stripe_publishable_key

* */
module.exports=envValues;
