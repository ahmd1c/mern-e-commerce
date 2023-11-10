const asyncHandler = require("../utils/asyncHandler");
const Product = require("../models/productModel");

exports.topCountries = asyncHandler(async (req, res, next) => {
    const countries = await Order.aggregate([
        {
            $group: {
                _id: "$country",
                total: { $sum: 1 }
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $limit: 4
        }
    ]);
    res.status(200).json({
        success: true,
        countries: countries
    })

})

exports.topMonths = asyncHandler(async (req, res, next) => {
    const months = await Order.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: 1 }
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $limit: 4
        }
    ]);
    res.status(200).json([
        {
            success: true,
            months
        }
    ])
})

const totalHandler = asyncHandler(async (req, res, next) => {
    
    const [productsCount, usersCount, ordersCount] = await Promise.all([
        Product.countDocuments(),
        User.countDocuments(),
        Order.countDocuments()
    ]);
    
    const totals = {
        productsCount,
        usersCount,
        ordersCount
    };

    res.status(200).json({
        success: true,
        totals
    })

})