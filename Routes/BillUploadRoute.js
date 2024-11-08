const express = require("express");
const router = new express.Router();
const BillUploadController = require("../Controllers/BillUploadController");
const upload = require("../Middileware/Upload");
const Auth = require("../Middileware/Auth")


router.post("/bill", upload.single('uploadFile'), BillUploadController.BillUpload)

module.exports = router;