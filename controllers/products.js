const Product = require('../models/product');


exports.getProductsList = (req,res,next)=>{
    let pageNumber = req.params.pageNumber;
    const ITEMS_PER_PAGE = 5;
    let totalProductCount;

console.log(pageNumber);
    Product.find()
        .countDocuments()
        .then(productCount=>{
            totalProductCount = productCount;
            let maxPageNumber = Math.ceil(totalProductCount/ITEMS_PER_PAGE);
            if(isNaN(pageNumber)){pageNumber=1}
            if(parseInt(pageNumber)<1){pageNumber=1}
            if(pageNumber*ITEMS_PER_PAGE>totalProductCount){ pageNumber=maxPageNumber }
            let skipCount =(pageNumber-1)*ITEMS_PER_PAGE;
            console.log(pageNumber)
            if(skipCount<0){skipCount=0}
             Product.find({})
                .skip(skipCount)
                .limit(ITEMS_PER_PAGE)
                .select('-creator -createdAt -updatedAt')
                .then(products=>{
                    res.status(200).json({
                        message:'Products fetched!',
                        totalProductCount:totalProductCount,
                        currentPage:pageNumber,
                        maxPageNumber:maxPageNumber,
                        itemsPerPage:ITEMS_PER_PAGE,
                        products:products
                    });
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
