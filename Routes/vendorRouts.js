const express = require("express")
const router = new express.Router();
const Auth = require("../Middileware/Auth")
const vendorController = require("../Controllers/VendorController")


router.post("/add-vendors", vendorController.Addvendors);
router.get("/getallvendors", vendorController.GetAllvendors);
router.get("/getvendor/:id", vendorController.GetvendorById);
router.put("/update-vendors/:id",vendorController.UpdatevendorsById);
router.delete("/delete-vendors/:id", vendorController.DeletevendorById);


module.exports = router