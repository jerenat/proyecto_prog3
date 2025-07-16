// -- librerias globales
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -- librerias locales
const User = require("../models/User");
const { createAccessToken } = require("../utils/jwt");

const authenticate = {};

// -- login de usuario
authenticate.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por username
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Login exitoso, responder sin la contraseña
    const accessToken = await createAccessToken({
      id: user.id,
      email: user.email,
    });

    // Configurar cookie con el token de acceso
    // Usar httpOnly para evitar acceso desde JavaScript
    // Secure para enviar solo en HTTPS en producción
    // SameSite para evitar CSRF
    // MaxAge para definir la duración de la cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo enviar cookies seguras en producción
      sameSite: "Strict", // Evitar CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    res.status(201).json({
      message: "OK",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al consultar el usuario:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// -- registro de usuario
authenticate.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con Sequelize
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "OK",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// -- Verificación de token (placeholder, no implementado)
authenticate.verifyToken = async (req, res) => {
  const SECRET = process.env.JWT_SECRET || "default_secret_key";
  // Obtener el token de las cookies
  const token = req.cookies.accessToken;
  // Si no hay token, retornar error
  if (!token) return res.status(401).json({ message: "No token provided" });
  // Verificar el token
  try {
    const decoded = jwt.verify(token, SECRET);
    return res.status(200).json(decoded); // usuario decodificado
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

authenticate.logout = async (req, res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "OK" });

};

// Exportar el controlador
module.exports = authenticate;
