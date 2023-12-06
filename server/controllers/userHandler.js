const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function createTokenAndCookie(id, res) {
    const token = jwt.sign({ userId: id }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_EXPIRE_IN,
    });
    // in productivity it is important to set secure property to true
    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 20,
        httpOnly: true,
    });
}


exports.signUp = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const newUser = await User.create({
        username,
        email,
        password
    })

    newUser.password = undefined;

    // create jwt and cookie
    createTokenAndCookie(newUser._id, res)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    })

})

exports.signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser || !await bcrypt.compare(password, findUser.password)) {

        return res.status(401).json({
            success: false,
            message: "invalid email or password"
        })
    }

    findUser.password = undefined;

    createTokenAndCookie(findUser._id, res)

    return res.status(201).json({
        success: true,
        message: "You are logged in",
        user: findUser
    })

})

exports.signOut = asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });
    res.status(200).json({
        success: true,
        message: "You are logged out",
    });
})

exports.updateProfile = asyncHandler(async (req, res, next) => {
    
    if(req.file) req.body.profilePhoto = `http://localhost:5000/${req.file?.filename} `
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true , runValidators: true});

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(201).json({
        success: true,
        message: "Username updated successfully",
        user: user,
    })
})

exports.changePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    await bcrypt.compare(currentPassword, user.password);

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    })
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    })
})


/**
@desc delete multiple users
@access admin
**/

exports.deleteUsers = asyncHandler(async (req, res, next) => {

    const users = await User.deleteMany({ _id: { $in: req.body } });
    if (users.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: "Users not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Users deleted successfully",
    })

})