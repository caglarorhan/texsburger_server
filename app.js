const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const e_p = require('./config');
//const isAuth = require('./middlewares/is-auth');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');
const paymentIntentRouter = require('./routes/paymentintents');
const webhooksRouter = require('./routes/webhooks');

const authRouter = require('./routes/auth');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.raw())
app.use(logger('dev'));
app.post('/webhooks',function(req,res,next){
    console.log(req.body);
})
app.use(express.json());
app.use('/webhooks', webhooksRouter);
app.use(express.urlencoded({
                                    extended: false,
                                    limit: '50mb',
                                    parameterLimit:50000
                                    }
                            )
);
app.use(cookieParser());

e_p().fs.static_folders.split(',').forEach(folderName => {
    app.use(express.static(path.join(__dirname, folderName)));
})

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
//app.use('/products', isAuth, adminRouter);
app.use('/paymentintents', paymentIntentRouter);

app.use('/products', productsRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('Hata olustu...')
  next(createError(404));
});

app.use(errorController.get404);

// error handler
app.use((err, req, res, next)=>{
  // send error data in json format
    let error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json({message:err.message, error: error});

});
let mongoDBConnection = e_p({isPromise: true})
    .then(configObject=>{
        mongoose.connect(configObject.db.mongo_db_connection,{ useNewUrlParser: true,  useUnifiedTopology: true  })
            .then(()=>console.log('MongoDB connected!'))
            .catch(err=>{
                let error= new Error(err);
                err.status = 500;
            })
    })
    .catch(err=>{
        console.log(err)
    })


module.exports = app;
