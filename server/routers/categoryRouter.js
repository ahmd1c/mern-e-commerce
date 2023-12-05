const { createCategory, deleteCategory, updateCategory, getCategories, getSubCategories, getAllSubCategories } = require("../controllers/category");

const router = require("express").Router();

router.get("/" , getCategories )
router.get("/subcategories" , getAllSubCategories )
router.post("/" , createCategory )
router.get("/:id" , getSubCategories )
router.put("/:id" , updateCategory )
router.delete("/:id" , deleteCategory )

module.exports = router