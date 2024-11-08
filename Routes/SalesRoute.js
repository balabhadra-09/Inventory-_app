const express = require("express");
const router = new express.Router();
const SalesController = require("../Controllers/SalesController");

router.post("/add-sales", SalesController.AddSales);
router.get("/get-sales", SalesController.getSales);


module.exports = router