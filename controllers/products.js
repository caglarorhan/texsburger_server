const Product = require('../models/product');


exports.getProductsList = (req,res,next)=>{
    const pageNumber = req.params.pageNumber || 0;
    const ITEMS_PER_PAGE = 5;
    let totalProductCount;

    Product.find()
        .countDocuments()
        .then(productCount=>{
            totalProductCount = productCount;
             Product.find({})
                .skip((pageNumber-1)*ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .select('-creator -createdAt -updatedAt')
                .then(products=>{
                    res.status(200).json({message:'Products fetched!',totalProductCount:totalProductCount,itemsPerPage:ITEMS_PER_PAGE,products:products});
                })
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
}





exports.getProductDetails = (req,res,next)=>{
    console.log(req.params.pid);
    let targetProductId = req.params.pid;
    Product.findById(targetProductId)
        .select('-creator -createdAt -updatedAt')
        .then(oProduct=>{
            if(!oProduct){
                const error =new Error('Product not found!');
                error.statusCode=404;
                throw error;
            }
            res.status(200).json({message:'Post fetched', product:oProduct} );
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500
            }
            next(err);
        })

}
