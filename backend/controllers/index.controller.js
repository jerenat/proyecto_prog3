// -- LIBRERIAS GLOBALES
const fs = require("fs");
const path = require("path");
const sanitizeHtml = require("sanitize-html");

// -- LIBRERIAS LOCALES
const Portfolio = require("../models/Portfolio");

const portfolioController = {};

// -- Crear el portafolio
portfolioController.createPortfolio = async (req, res) => {
  const { id } = req.user; // obtener ID de usuario
  const { file } = req; // imagen
  const { title, description, technologies, isPublic } = req.body; // titulo, descripcion, tecnologias, es publico o no

  const newTitle = sanitizeHtml(title); // escapa titulo
  const newDescription = sanitizeHtml(description); // escapa carácteres
  const newIsPublic = parseInt(isPublic); // 0 -> publico, 1 -> privado

  const techArray =
    typeof technologies === "string"
      ? technologies.split(",").map((t) => t.trim())
      : technologies;

  try {
    const newPortfolio = await Portfolio.create({
      userid: id,
      image: file.filename,
      title: newTitle,
      description: newDescription,
      technologies: techArray,
      is_public: newIsPublic,
    });

    res.status(201).json({ message: "OK", pid: newPortfolio.id });
  } catch (error) {
    console.error("Error al crear el portafolio:", error);
  }
};

// -- Obtener el portafolio
portfolioController.getPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error al obtener los portafolios:", error);
    res.status(500).json({ message: "Error al obtener los portafolios" });
  }
};

// -- Obtener portafolio por id
portfolioController.getPortfolioById = async (req, res) => {
  try {
    const { id } = req.user; // decodeToken | req.user
    const portfolios = await Portfolio.findAll({
      where: { userid: id },
    });

    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error al obtener los portafolios:", error);
    res.status(500).json({ message: "Error al obtener los portafolios" });
  }
};

// -- Editar portafolio por ID
portfolioController.editPortfolioById = async (req, res) => {
  try {
    const { id } = req.user; // ID del usuario autenticado
    const { portfolioId } = req.params; // ID del portafolio a editar
    const { title, description, technologies, isPublic } = req.body;
    const { file } = req; // Imagen nueva opcional

    const techArray =
      typeof technologies === "string"
        ? technologies.split(",").map((t) => t.trim())
        : technologies;

    // Buscar el portafolio asegurando que le pertenezca al usuario
    const portfolio = await Portfolio.findOne({
      where: {
        id: portfolioId,
        userid: id,
      },
    });

    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "Portafolio no encontrado o no autorizado" });
    }

    // Si se sube nueva imagen, borrar la anterior del disco
    if (file) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        portfolio.image
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      portfolio.image = file.filename;
    }

    // Actualizar campos
    portfolio.userid = id || portfolio.userid;
    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.technologies = techArray || portfolio.technologies;
    portfolio.isPublic = isPublic ?? portfolio.isPublic;

    await portfolio.save();

    res.status(200).json({ message: "Portafolio actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar el portafolio:", error);
    res.status(500).json({ message: "Error al editar el portafolio" });
  }
};

// -- Eliminar un portafolio por ID
portfolioController.deletePorfolioById = async (req, res) => {
  try {
    const { id } = req.user; // ID del usuario autenticado
    const { portfolioId } = req.params; // ID del portafolio a eliminar

    console.log(req.params);

    // Buscar el portafolio asegurando que le pertenezca al usuario
    const portfolio = await Portfolio.findOne({
      where: {
        id: portfolioId,
        userid: id,
      },
    });

    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "Portafolio no encontrado o no autorizado" });
    }

    // Eliminar la imagen asociada si existe
    const imagePath = path.join(__dirname, "..", "uploads", portfolio.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Borra el archivo del disco
    }

    // Eliminar el registro de la base de datos
    await portfolio.destroy();

    res.status(200).json({ message: "Portafolio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el portafolio:", error);
    res.status(500).json({ message: "Error al eliminar el portafolio" });
  }
};

module.exports = portfolioController;
