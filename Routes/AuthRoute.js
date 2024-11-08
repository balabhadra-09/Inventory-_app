const express = require("express")
const router = new express.Router();

const AuthController = require("../Controllers/AuthController")

//@route   v1/api/login

 router.post("/register", AuthController.createUser);
 router.post("/login", AuthController.userLogin);

module.exports = router