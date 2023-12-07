const { getUserOrders } = require("../controllers/orderHandler");
const { signUp, signIn, signOut, updateProfile, changePassword } = require("../controllers/userHandler");
const { verifyToken } = require("../utils/authVerification");
const uploadPhoto = require("../utils/uploadPhoto");
const { signUpValidation, signInValidation, updateProfileValidation, changePasswordValidation } = require("../validation/userValidation");

const router = require("express").Router()

router.route("/signup").post( signUpValidation , signUp)
router.route("/profile").put(verifyToken , uploadPhoto.single("profilePhoto") , updateProfileValidation , updateProfile)
router.route("/changePassword").patch(verifyToken , changePasswordValidation , changePassword)
router.route("/signin").post( signInValidation , signIn)
router.route("/signout").get(signOut)
router.route("/orders").get(verifyToken , getUserOrders )

module.exports = router;

