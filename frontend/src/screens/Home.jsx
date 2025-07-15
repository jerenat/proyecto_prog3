import { useState, useEffect } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Card from "../components/Card";
import { ButtonLink } from "../components/Button";
import { tecnologias } from "../datos/proyecto-mock.js";
import { getPortfolio, deletePortfolio } from "../api/portfolio.js";
import { useAuth } from "../context/AuthContext";
import EmptyList from "../assets/images/empty_list.png";

function Home() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getPortfolio();
        setProjects(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      const deletePort = await deletePortfolio(id);
      if (deletePort.status === 200) {
        alert("Portafolio eliminado correctamente.");
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el Portafolio");
      console.error("Error al eliminar el portafolio", error);
    }
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleSeleccionTecnologia = (tecnologia) => {
    setTecnologiaSeleccionada(tecnologia);
    setMenuAbierto(false);
  };

  const toggleFeatured = (id) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProjects(updated);
  };

  // Filtrar solo proyectos públicos
  const publicProjects = projects.filter((p) => p.is_public === 0);

  // Aplicar filtro por tecnología (si existe)
  const proyectosFiltrados = tecnologiaSeleccionada
    ? publicProjects.filter((p) =>
        p.technologies.includes(tecnologiaSeleccionada)
      )
    : publicProjects;

  return (
    <div className="text-center p-4 relative">
      <div className="flex flex-row justify-between items-center w-full my-4">
        <ButtonLink
          text={"Nuevo diseño"}
          color="green"
          className="font-medium text-[1.1rem]"
          to={"/new"}
        />
        <h2 className="text-2xl font-light">¿Qué deseas explorar hoy?</h2>
        <div className="relative flex items-center">
          <ButtonLink
            onClick={toggleMenu}
            text={"Tecnologías"}
            color="pink"
            className="font-medium text-[1.1rem]"
          />
          {menuAbierto && (
            <ul className="absolute top-14 right-0 bg-white shadow-lg rounded-md py-4 z-10">
              {tecnologias.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSeleccionTecnologia(item)}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-6 text-black"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {tecnologiaSeleccionada && (
        <p className="filtro-activo">
          Filtrado por: <strong>{tecnologiaSeleccionada}</strong>{" "}
          <button onClick={() => setTecnologiaSeleccionada(null)}>
            <RiDeleteBack2Fill />
          </button>
        </p>
      )}

      {user && (
        <>
          {proyectosFiltrados.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-10 gap-8">
              <img
                src={EmptyList}
                alt="No hay proyectos"
                className="w-96 mt-10"
              />
              <h1 className="text-4xl">Puedes agregar un nuevo Diseño!</h1>
              <p className="text-white/60">
                Ingresa en "Nuevo Diseño" para crear un archivo de portafolio y
                llenar este listado.
              </p>
            </div>
          ) : (
            <div className="grid grid-template justify-center gap-6 p-2 my-5">
              {[...proyectosFiltrados]
                .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
                .map((p) => (
                  <Card
                    key={p.id}
                    project={p}
                    userId={user.id}
                    onToggleFeatured={toggleFeatured}
                    onDelete={handleDeleteProject}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
