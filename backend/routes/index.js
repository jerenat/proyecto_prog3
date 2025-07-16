// -- librerias globales
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// -- librerias locales
const decodeToken = require("../utils/decode.js");
const portfolioController = require("../controllers/index.controller.js");

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Asegurate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// -- Crear portafolio
router.post(
  "/portfolio",
  decodeToken,
  upload.single("image"),
  portfolioController.createPortfolio
);

// -- Obtener todos los portafolios (admin)
router.get("/portfolio", decodeToken, portfolioController.getPortfolio);

// -- Obtener portafolios por usuario autenticado
router.get("/portfolio/:id", decodeToken, portfolioController.getPortfolioById);

// -- Eliminar portafolio por ID
router.delete(
  "/portfolio/:portfolioId",
  decodeToken,
  portfolioController.deletePorfolioById
);

// Editar portafolio por ID
router.put(
  "/portfolio/:portfolioId",
  decodeToken,
  upload.single("image"), // Imagen nueva opcional
  portfolioController.editPortfolioById
);

module.exports = router;
