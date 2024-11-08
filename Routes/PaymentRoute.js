const express = require("express");
const router = new express.Router();
const PaymentController = require("../Controllers/PaymentController");
const Auth = require("../Middileware/Auth")

router.post("/add-payment", PaymentController.AddPayment);
router.get("/getall-payment", PaymentController.GetAllPayments);
router.get("/getPayments/:id", PaymentController.GetPaymentById);
router.put("/payment-update/:id", PaymentController.UpdatePayment);
router.delete("/payment-delete/:id", PaymentController.DeletePayment);
router.get("/get-outstanding", PaymentController.GetOutstanding);

module.exports = router




