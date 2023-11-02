const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");
const { validateObjectId } = require("../utils/authVerification");

exports.getProducts = asyncHandler(async (req, res) => {

    let productsQuery = Product.find();

    if (req.query.category) {
        productsQuery = Product.find({ category: req.query.category })
    }

    if (req.query.subCategory) {
        productsQuery = Product.find({ category: req.query.subCategory })
    }

    if (req.query.sort) {
        
        const sort = req.query.sort.split(",").join(" ")
        console.log(sort);
        productsQuery = productsQuery.sort(sort)

    }else{
        productsQuery = productsQuery.sort("-createdAt")
    }

    if (req.query.minPrice && req.query.maxPrice) {
        productsQuery = productsQuery.find({ afterPrice: { $gte: req.query.minPrice, $lte: req.query.maxPrice } })
    }

    if (req.query.keyword) {
        productsQuery = productsQuery.find({
            $or: [

                { name: { $regex: req.query.keyword, $options: "i" } },
                { description: { $regex: req.query.keyword, $options: "i" } }

            ]
        })
    }

    // DEALING WITH PAGINATION

    const page = req.query.pageNumber * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    productsQuery = productsQuery.skip(skip).limit(limit);

    // EXECUTE QUERY

    const products = await productsQuery;
    
    // PAGINATION INFO

    const totalItems = products.length;
    const paginationInfo = {
        totalItems,
        pageSize: limit,
        totalPages: Math.ceil( totalItems / limit),
        currentPage: page
    };


    res.status(200).json({
        success: true,
        products,
        paginationInfo
    });

})

exports.getProduct = asyncHandler(async (req, res) => {

    validateObjectId(req.params.productId);


    const product = await Product.findById(req.params.productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    res.status(200).json({
        success: true,
        product
    });
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create({...req.body , [req.file?.fieldname]: req.file?.filename});
    res.status(201).json(product);
})

exports.updateProduct = asyncHandler(async (req, res) => {

    validateObjectId(req.params.productId);


    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        product
    });

    
})

exports.deleteProduct = asyncHandler(async (req, res) => {

    validateObjectId(req.params.productId);

    const deletedProduct = await Product.deleteOne({ _id: req.params.productId });
    if (deletedProduct.n === 0) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
    
})
