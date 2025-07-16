import React from "react";
import Logo from "../assets/logo.svg";
import {ButtonLink} from "../components/Button";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-6">
      <img src={Logo} alt="Logo" className="w-32 mb-4" />
      <h1 className="text-4xl">404 - Página no encontrada</h1>
      <div className="max-w-md text-center">

        <p className="text-white/60">
            Sorry, the page you are looking for does not exist. Please visit our
            Help Center for more information. Error code: [95cc0a3ef8ba1eba-EZE]
        </p>
      </div>
      <ButtonLink to={"/"} text={"Volver a inicio"} className="text-2xl font-medium" color="blue"/>
    </div>
  );
}

export default NotFound;
