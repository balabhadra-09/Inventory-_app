const Auth = require("../Middileware/Auth")
const express = require("express")
const router = new express.Router();
 
const ItemCreationController = require("../Controllers/ItemCreationController");

router.post("/item",  ItemCreationController.ItemCreate);
router.get("/getalls",  ItemCreationController.getAllItems);
router.get("/getitemByid:id",  ItemCreationController.getItemById);
router.put("/update-item/:id",  ItemCreationController.updateItem);
router.put("/stock-update", ItemCreationController.updateStock);
router.delete("/delete-item/:id", ItemCreationController.deleteItem);
router.put("/stock-decrease", ItemCreationController.StockDecrease);
 

module.exports = router

 