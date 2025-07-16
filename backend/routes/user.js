const express = require("express");
const router = express.Router();

const decodeToken = require("../utils/decode.js");
const userController = require("../controllers/user.controller.js");

// -- Obtener perfil de usuario
router.get("profile", decodeToken, userController.getUserById);

module.exports = router;
