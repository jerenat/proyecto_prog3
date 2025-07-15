import React from "react";
import { Link } from "react-router-dom";

// -- PALETA DE COLORES
const colors = {
  red: ["bg-red-500", "hover:bg-red-700", "border-b-red-800"],
  orange: ["bg-orange-500", "hover:bg-orange-700", "border-b-orange-800"],
  yellow: ["bg-yellow-300", "hover:bg-yellow-500", "border-b-yellow-600"],
  green: ["bg-green-400", "hover:bg-green-700", "border-b-green-800"],
  cyan: ["bg-cyan-600", "hover:bg-cyan-800", "border-b-cyan-900"],
  blue: ["bg-blue-500", "hover:bg-blue-700", "border-b-blue-800"],
  purple: ["bg-purple-500", "hover:bg-purple-700", "border-b-purple-800"],
  pink: ["bg-pink-500", "hover:bg-pink-700", "border-b-pink-800"],
};

export function ButtonLink({
  icon,
  text,
  onClick = null,
  to = null,
  className = "",
  color = "orange",
  submit = false,
}) {
  const [bgColor, hoverColor, borderColor] = colors[color] || colors.orange;

  const button = (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-1.5 text-white rounded-md transition-colors duration-300 cursor-pointer ${bgColor} ${hoverColor} border-b-4 ${borderColor} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );

  // Si tiene prop "to", renderiza como Link, si no, como botón común
  return to ? <Link to={to}>{button}</Link> : button;
}

// -- No Button, Icon / Text
export function NoButton({ icon, text, onClick = null, to = null }) {
  const content = (
    <>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="flex items-center gap-2">
        {content}
      </button>
    );
  }

  return (
    <Link to={to || "#"} className="flex items-center gap-2">
      {content}
    </Link>
  );
}

// -- List Link (a[href=""])
export function ListLink({ to, text, onClick = null, className }) {
  return (
    <Link to={to} className={`outline-0 ${className}`} onClick={onClick}>
      {text}
    </Link>
  );
}
