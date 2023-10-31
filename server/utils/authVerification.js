
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const  mongoose = require("mongoose");

exports.verifyToken = async(req, res, next) => {
    const token = req.cookies.jwt;
    try{
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }
        req.user = userId;
        next();
        
    }catch(err){
        res.status(401).json({
            success: false,
            message: "unauthorized"
        })
        
    }
}

exports.verifyAdmin = asyncHandler(async(req, res, next) => {
    const userId = req.user;
    const user = await User.findById(userId);
    if( !user || user.role !== "admin" ){
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        })
        
    }
    next();
})

exports.validateObjectId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        return res.status(400).json({
            success: false,
            message: "invalid id"
        })
    }
    
}