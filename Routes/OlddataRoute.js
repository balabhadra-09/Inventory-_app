const express = require("express")
const router = new express.Router();
const upload = require("../Middileware/Upload")
const Auth = require("../Middileware/Auth");
const OldDataController = require("../Controllers/OldDataController")




router.post("/csvfile",   upload.single('Olddataupload'), OldDataController.OldataUpload)



module.exports = router