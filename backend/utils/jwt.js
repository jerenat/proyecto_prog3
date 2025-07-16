require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "default_secret_key"; // Clave por defecto

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

module.exports = {
  createAccessToken,
};
