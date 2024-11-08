const express = require("express");
const router = new express.Router();
const upload = require("../Middileware/Upload")
const SettingsController = require("../Controllers/SettingsController");
const Auth = require("../Middileware/Auth")


router.put("/Settings",  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favIcon', maxCount: 1 }]),
    SettingsController.Settings);

router.get("/all-settings", SettingsController.setting);
router.delete("/delete-settings/:id", SettingsController.deleteSetting);  

module.exports = router;