const express = require("express");
const authenticate = require("../controllers/auth.controller.js");

const router = express.Router();

// Registro de usuario
router.post("/register", authenticate.register);

// Login de usuario
router.post("/login", authenticate.login);

// Verificación de token
router.get("/verify", authenticate.verifyToken);

// Cierre de sesión
router.get("/logout", authenticate.logout);

module.exports = router;
