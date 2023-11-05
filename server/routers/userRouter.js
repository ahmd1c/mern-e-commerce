const { signUp, signIn, signOut } = require("../controllers/userHandler");
const { signUpValidation, signInValidation } = require("../validation/userValidation");

const router = require("express").Router()

router.route("/signup").post( signUpValidation , signUp)
router.route("/signin").post( signInValidation , signIn)
router.route("/signout").get(signOut)

module.exports = router;

