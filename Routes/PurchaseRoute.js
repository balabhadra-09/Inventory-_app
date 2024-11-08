const express = require("express")
const router = new express.Router();
const PurchaseController = require("../Controllers/PurchaseController");
const Auth = require("../Middileware/Auth")

router.post("/create-purchase",  PurchaseController.CreatePurchase);
router.get("/get-purchase",  PurchaseController.GetPurchase);



module.exports = router