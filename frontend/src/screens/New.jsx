// -- LIBRERIAS GLOBALES
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// -- LIBRERIAS Y COMPONENTES LOCALES
import { useAuth } from "../context/AuthContext"; // Contexto de Usuario
import {
  postFormPortfolio, // crear
  putFormPortfolio, // editar
  getPortfolioById, // obtener
} from "../api/portfolio.js"; // portafolio API

import Card from "../components/Card"; // Tarjetas
import { ButtonLink } from "../components/Button"; // Botones

function NewPortfolio() {
  // -- Parámetros
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // -- Estados
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState(null);
  const [isPublic, setIsPublic] = useState("0");
  const [preview, setPreview] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Obtener datos si hay ID (edición)
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const { data } = await getPortfolioById(id);
        const portfolioData = Array.isArray(data) ? data[0] : data;

        setTitle(portfolioData.title || "");
        setDescription(portfolioData.description || "");
        setTechnologies(
          Array.isArray(portfolioData.technologies)
            ? portfolioData.technologies.join(", ")
            : ""
        );
        setImage(null); // Resetear porque puede venir como string o null
        setPreview(portfolioData);
      } catch (err) {
        console.error("Error al obtener el portafolio.");
      }
    };

    if (id) fetchProjectById();
  }, [id]);

  // Manejo de archivo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  // Envío de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("technologies", technologies);
    formData.append("isPublic", isPublic);
    if (image) formData.append("image", image);

    try {
      let response;

      // Si hay ID => editar
      if (id) {
        response = await putFormPortfolio(id, formData);
        if (response.status === 200) {
          alert("Portafolio actualizado con éxito.");
        }
      } else {
        // Si no hay ID => crear
        response = await postFormPortfolio(formData);
        if (response.status === 201) {
          alert("Portafolio creado con éxito.");
        }
      }

      // Redireccionar después de crear o editar
      if (response?.data?.pid || response?.data?.id) {
        const pid = response.data.pid || response.data.id;
        navigate(`/portfolio/${pid}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error al enviar el formulario");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-start mt-10 px-6 md:px-20 gap-10">
      {/* FORMULARIO */}
      <section className="w-full md:w-1/2 p-6 rounded-lg min-h-[600px] flex flex-col">
        <div className="title mb-4">
          <h2 className="text-2xl font-light text-center">
            {id ? "Editar Diseño" : "¿Qué diseñamos hoy?"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Imagen */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Imagen
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Vista previa"
                className="mt-4 rounded-md shadow border border-gray-300 max-h-60 object-contain"
              />
            )}
          </div>

          {/* Título */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del proyecto"
              className="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del proyecto"
              className="shadow resize-none appearance-none border-gray-500 rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Tecnologías */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tecnologías
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Node, MySQL..."
              className="shadow appearance-none border-gray-500 rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Perfil */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Perfil
            </label>
            <select
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value)}
              className="outline-none w-full py-2 px-4 rounded-lg text-black border border-gray-300"
            >
              <option value="0">Público</option>
              <option value="1">Privado</option>
            </select>
          </div>

          {/* Botón */}
          <div className="mt-auto">
            <ButtonLink
              submit={true}
              text={id ? "Editar diseño" : "Crear diseño"}
              className="text-[1.1rem] font-semibold"
            />
          </div>
        </form>
      </section>

      {/* VISTA PREVIA */}
      {id && preview && (
        <section className="w-full md:w-1/2 p-6 rounded-lg min-h-[600px]">
          <div className="title mb-4">
            <h2 className="text-2xl font-light text-center">Vista Previa</h2>
          </div>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <Card
              project={{
                ...preview,
                technologies: Array.isArray(preview.technologies)
                  ? preview.technologies
                  : typeof preview.technologies === "string"
                  ? preview.technologies.split(",").map((tech) => tech.trim())
                  : [],
              }}
              userId={user?.id}
              onToggleFeatured={() => {}}
              showButtons={false}
              showIcons={false}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default NewPortfolio;
