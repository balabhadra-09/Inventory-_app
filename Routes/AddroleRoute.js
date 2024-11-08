const express = require("express")
const router = new express.Router();
const AddroleController = require("../Controllers/AddroleController");


router.post("/addrole",AddroleController.AddNewrole);
router.get("/getallroles",AddroleController.GetAllsRole);
router.get("/getrole/:id", AddroleController.GetRoleById);
router.put("/update-role/:id", AddroleController.UpdateRole);
router.delete("/delete-role/:id", AddroleController.deleteRole);


module.exports = router;
