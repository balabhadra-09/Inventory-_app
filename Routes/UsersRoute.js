const express = require("express");
const router = new express.Router();
const UsersController = require("../Controllers/UsersController")
const upload = require("../Middileware/Upload");
const Auth = require("../Middileware/Auth")

router.post("/users-create",  upload.single('profilePicture'), UsersController.CreateUser);
router.post("/user-login", UsersController.LoginUser)
router.get("/users-get",  UsersController.GettAll);
router.get("/usersbyId/:id",  UsersController.UsersGetById);
router.put("/users-update/:id",  upload.single('profilePicture'), UsersController.updateUser);
router.delete("/users-delete/:id",  UsersController.deleteUsrs)

module.exports = router