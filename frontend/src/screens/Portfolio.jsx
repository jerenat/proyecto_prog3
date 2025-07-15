import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPortfolioById } from "../api/portfolio.js";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext"; // Si querés mostrar botones de edición

function Portfolio() {
  const { id } = useParams();
  const { user } = useAuth(); // Para saber si es el dueño
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getPortfolioById(id);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setProject(response.data[0]); // Si es array
        } else {
          setProject(response.data); // Si es objeto directo
        }
      } catch (err) {
        console.error("Error al obtener el proyecto:", err);
        setError("No se pudo cargar el proyecto.");
      }
    };

    if (id) fetchProject();
  }, [id]);

  return (
    <div className="flex w-full flex-col justify-center items-center py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Detalle del Proyecto</h1>

      {error && <p className="text-red-400">{error}</p>}

      {!project && !error && <p>Cargando...</p>}

      {project && (
        <Card
          project={{
            ...project,
            technologies: Array.isArray(project.technologies)
              ? project.technologies
              : typeof project.technologies === "string"
              ? project.technologies.split(",").map((tech) => tech.trim())
              : [],
          }}
          userId={user?.id} // para mostrar botones solo al dueño
          onToggleFeatured={() => {}}
          showButtons={false}
        />
      )}
    </div>
  );
}

export default Portfolio;
