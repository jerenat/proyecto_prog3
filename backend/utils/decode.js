require("dotenv").config();
const jwt = require("jsonwebtoken");

function decodeToken(req, res, next) {
  const token = req.cookies.accessToken; // ← CORRECTO: obtener desde cookies

  if (!token) {
    return res.status(401).json({ message: "Token no encontrado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aquí tendrás { id, name, email, ... }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

module.exports = decodeToken;
