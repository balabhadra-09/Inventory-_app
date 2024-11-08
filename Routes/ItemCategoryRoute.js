const express = require("express");
const router = new express.Router();
const ItemCategoryController = require("../Controllers/ItemCategoryController");
const Auth = require("../Middileware/Auth")

//@route v1/api/add-category
router.post("/add-category",  ItemCategoryController.AddCategory);
router.get("/getall-category", ItemCategoryController.GetAllCategory);
router.get("/get-category/:id",  ItemCategoryController.GetCategoryById);
router.put("/update-category/:id",  ItemCategoryController.UpdateCategoryById);
router.delete("/delete-category/:id",  ItemCategoryController.DeleteCategoryById);

module.exports = router;