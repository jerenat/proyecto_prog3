// -- LIBRERIAS GLOBALES
import React, { useState } from "react";

// -- Iconos
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { LuStarOff } from "react-icons/lu";

// -- LIBRERIAS LOCALES
import { NoButton, ButtonLink } from "./Button";
import { getColorForTech } from "../components/Components";
// -- Imagen por defecto
import NoCardPhoto from "../assets/images/no_card_photo.png";

function Card({
  project,
  userId,
  showButtons = true,
  showIcons = true,
  onToggleFeatured,
  onDelete,
}) {
  // -- Obtener URL de Imagen (Local o URL)
  const isServerImage =
    typeof project.image === "string" &&
    !project.image.startsWith("data:") &&
    !project.image.includes("/static/");

  const initialSrc = isServerImage
    ? `http://localhost:3001/public/${project.image}`
    : NoCardPhoto;

  const [imageSrc, setImageSrc] = useState(initialSrc);

  const handleImageError = () => {
    setImageSrc(NoCardPhoto);
  };

  // -- END IMAGE

  // -- Usuario == Tarjeta
  const esPropietario = userId === project.userid;

  // -- Eliminar TARJETA
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro que deseas eliminar este portafolio?")) {
      onDelete(project.id);
    }
  };

  return (
    <div className="project-card bg-gray-600 rounded-lg shadow-lg px-2 py-4 flex flex-col justify-between">
      <img
        src={imageSrc}
        alt={project.title}
        onError={handleImageError}
        className="rounded-md object-cover"
      />

      <div className="flex flex-col w-full justify-center items-center gap-5">
        <h3 className="text-2xl font-bold mt-4">{project.title}</h3>
        <p className="text-sm text-white mt-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className={`${getColorForTech(
                tech
              )} text-white text-xs font-semibold px-3 py-1 rounded-full shadow`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {showButtons && (
        <div className="my-8 w-full px-6 flex flex-col gap-5">
          {project.featured ? (
            <ButtonLink
              onClick={() => onToggleFeatured(project.id)}
              text={"Quitar de Destacado"}
              icon={<LuStarOff size={20} />}
              color="yellow"
            />
          ) : (
            <ButtonLink
              onClick={() => onToggleFeatured(project.id)}
              text={"Marcar como Destacado"}
              icon={<FaStar size={20} />}
            />
          )}
        </div>
      )}

      {/* Solo mostrar los botones si el usuario es el dueño */}
      {esPropietario && showIcons && (
        <div className="flex flex-row w-full gap-5 justify-center mt-4">
          <NoButton
            icon={<MdModeEditOutline size={28} />}
            to={`/edit/${project.id}`}
          />
          <NoButton
            icon={<IoMdShare size={28} />}
            to={`/share/${project.id}`}
          />
          <NoButton icon={<MdDelete size={28} />} onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default Card;
