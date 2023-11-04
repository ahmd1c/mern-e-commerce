
const multer = require("multer");


const storage = multer.diskStorage({
    filename : (req , file , cb)=>{
        cb(null , `${Date.now()}_${file.originalname}`)
    },

    destination : (req , file , cb)=>{
        cb(null , `./public`)
    },

})

const uploadPhoto = multer({
    storage,
    fileFilter : (req , file , cb)=>{
        if(file.mimetype.startsWith("image")) return cb(null , true)
        return cb(null , false)
    }

})

module.exports = uploadPhoto