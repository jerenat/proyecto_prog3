const User = require("../models/User");

const userController = {};

// -- Obtener usuario por ID
userController.getUserById = async (req, res) => {
  try {
    const { id } = req.user; // decodeToken | req.user
    const users = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
    });

    if (!users) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

module.exports = userController;
