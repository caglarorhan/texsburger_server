const Product = require('../models/product');

exports.getAdminDashPage = (req, res, next) => {
    res.render('admin/dashpage', {
        pageTitle: 'Admin Dash Page',
        pagePath: '/admin/dashpage',
        editing: false
    });
};

exports.getProductCreationForm = (req, res, next) => {
    res.render('admin/productCreationForm', {
        pageTitle: 'Create Product Form',
        pagePath: '/admin/productcreationform',
        editing: false
    });

};
exports.postProductCreate = (req, res, next) => {
    const product = new Product({
            productName: req.body.productName,
            productPrice:req.body.productPrice,
            productDescription:req.body.productDescription,
            productImage: req.file.path,
            creator:{name: 'Caglaror'}
    })
        product.save()
            .then(result=>{
                res.status(201).json({
                    message:'Product created succesfully.',
                    product: result
                })
            })
            .catch(err=>{console.log(err)})
};
