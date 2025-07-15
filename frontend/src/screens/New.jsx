import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postFormPortfolio, getPortfolioById } from "../api/portfolio.js";
import Card from "../components/Card";
import { ButtonLink } from "../components/Button";

function NewPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState(null); // Puede ser File o string
  const [isPublic, setIsPublic] = useState("0");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const getFullPortfolio = await getPortfolioById(id);
        const [getFullData] = getFullPortfolio.data;

        setTitle(getFullData.title || "");
        setDescription(getFullData.description || "");
        setTechnologies(getFullData.technologies.join(", ") || "");
        setImage(getFullData.image || null);

        if (
          Array.isArray(getFullPortfolio.data) &&
          getFullPortfolio.data.length > 0
        ) {
          setPreview(getFullPortfolio.data[0]); // Si es array
        } else {
          setPreview(getFullPortfolio.data); // Si es objeto directo
        }
      } catch (err) {
        console.error("Error al obtener el portafolio.");
      }
    };

    if (id) fetchProjectById();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("technologies", technologies);
    formData.append("isPublic", isPublic);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await postFormPortfolio(formData);

      if (response.status === 201) {
        const { data } = response;
        alert("Portafolio creado con exito.");

        // Reset
        setTitle("");
        setDescription("");
        setTechnologies("");
        setImage(null);
        setPreview(null);

        navigate(`/portfolio/${data.pid}`);
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
          {/* IMAGEN */}
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
            {preview && typeof preview === "string" && (
              <img
                src={preview}
                alt="Vista previa"
                className="mt-4 rounded-md shadow border border-gray-300"
              />
            )}
          </div>

          {/* TITULO */}
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

          {/* DESCRIPCIÓN */}
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

          {/* TECNOLOGÍAS */}
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

          {/* PERFIL */}
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

          {/* BOTÓN */}
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
      {id && preview && typeof preview === "object" && (
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
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default NewPortfolio;
