const Product = require('../models/product');
const e_p = require('../config');
const fs = require('fs');
const path = require('path');

exports.getAdminDashPage = (req, res, next) => {
    res.render('admin/dashpage', {
        pageTitle: 'Admin Dash Page',
        pagePath: '/admin/dashpage',
        editing: false
    });
};

exports.getProductCreationForm = (req, res, next) => {
    res.render('admin/productcreationform', {
        pageTitle: 'Create Product Form',
        pagePath: '/admin/productcreationform',
        editing: false
    });
};
exports.getProducts = (req,res,next)=>{
    res.render('admin/products',{
        pageTitle: 'Admin Product Operations',
        pagePath: '/admin/dashpage',
        editing: true
    })
}
exports.postProductCreate = (req, res, next) => {
    const product = new Product({
            productName: req.body.productName,
            productPrice:req.body.productPrice,
            productDescription:req.body.productDescription,
            productImage: req.file.path,
            creator:{name: ''}
    })
        product.save()
            .then(result=>{
                res.status(201).json({
                    message:'Product created successfully.',
                    product: result
                })
            })
            .catch(err=>{console.log(err)})
};

exports.deleteProduct = (req,res,next)=>{
    let pId = req.params.pid;
console.log(pId, 'will be deleted!')
    Product.findById(pId)
        .then(product=>{
            if(!product){
                const error = new Error('Product couldnt find!');
                error.statusCode = 404;
                throw error;
            }
            // product found
            //delete image
            let filePath = path.join(__dirname,'../',product.productImage);
            console.log(filePath);
            fs.unlinkSync(filePath);
            //delete product data
            return Product.findByIdAndDelete(pId);
        })
        .then(product=>{
            res.status(200).json({message:'Product deleted!', product: product})
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
}

exports.putProductUpdate =(req,res,next)=>{

    Product.findById(req.body.productId)
        .then(product=>{
            if(!product){
                const error = new Error('Couldnt find a product!');
                error.statusCode=404;
                throw error;
            }
            product.productName = req.body.productName;
            product.productDescription = req.body.productDescription;
            if(req.file){
                product.productImage = req.file.path;
            }
            product.productPrice=req.body.productPrice,
            product.creator = {name:''}
            return product.save();
        })
        .then(result=>{
            res.status(200).json({
                message:'Product updated successfully.',
                product: result
            })
        })
        .catch(err=>{
            next(err)
        })
}
