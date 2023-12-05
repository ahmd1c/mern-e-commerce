const { getProducts, getProduct, updateProduct, deleteProduct, createProduct } = require("../controllers/productController");
const { verifyAdmin } = require("../utils/authVerification");
const uploadPhoto = require("../utils/uploadPhoto");
const {  assertCategoryandSubCategory, createProductValidator, updateProductValidator }  = require("../validation/productValidation");

const router = require("express").Router();

router.get("/", getProducts)
router.post("/" , verifyAdmin , uploadPhoto.single("image") , createProductValidator , assertCategoryandSubCategory ,createProduct)
router.get("/:productId", getProduct)
router.put("/:productId", verifyAdmin , uploadPhoto.single("image") , updateProductValidator , assertCategoryandSubCategory ,  updateProduct)
router.delete("/:productId", verifyAdmin , deleteProduct)


module.exports = router;