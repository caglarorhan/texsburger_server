const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV; // 'development' | 'test' | 'production'
console.log(`You are running on ${env} mode!`);

const configObject = {
    development:{
        app: {
            port: parseInt(process.env.DEVELOPMENT_APP_PORT) || 3000
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
            port: parseInt(process.env.TEST_APP_PORT) || 3000
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
            port: parseInt(process.env.PRODUCTION_APP_PORT) || 3000
        },
        db: {
            mongo_db_connection: process.env.PRODUCTION_MONGODB_CONNECTION || ''
        },
        fs:{
            static_folders: process.env.PRODUCTION_STATIC_FILE_FOLDERS || 'static'
        }
    }

}

const envValues =(variable_group,variable, options={isPromise:false})=>{
    //console.log(configObject[env][variable_group],)
    if(options.isPromise){
        return new Promise((res,rej)=>{
                if(configObject[env][variable_group][variable]){
                    res(configObject[env][variable_group][variable]);
                }else{
                    rej('Configuration data is not exist!')
                }

            }
        );
    }else{
        return configObject[env][variable_group][variable]
    }


}

module.exports=envValues;
