
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const mongoose = require("mongoose");

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies?.jwt;
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }
        req.user = { id: userId , role: user.role }
        
        next();

    } catch (err) {
        res.status(401).json({
            success: false,
            message: "unauthorized"
        })

    }
}

exports.verifyAdmin = asyncHandler(async (req, res, next) => {
    console.log("admin");
    this.verifyToken(req , res , ()=>{
        if (req.user?.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }
        next();
    })

})

exports.validateObjectId = (id) => {
    console.log("id");

    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        throw new Error("invalid id");
    }
}