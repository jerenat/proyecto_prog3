import React from "react";
import { IoIosLogIn } from "react-icons/io";
import { FaLockOpen } from "react-icons/fa";


import BackgroundImage from "../assets/background_index.webp";
import { ButtonLink } from "../components/Button";

function Index() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="w-full h-full bg-black/60 flex flex-col justify-start items-center pt-12">
        {/* -- TITULO Y DESCRIPCION -- */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-white text-7xl font-light text-shadow-2xs">
            Tu diseño, Nuestra inspiración
          </h2>
          <p className="text-3xl font-light mt-4">
            Haz que tu arte luzca, tus diseños innoven, tu voz sea escuchada, sé
            conocido.
          </p>
          <div className="mt-8">
            <ButtonLink
              to="/home"
              className="text-2xl font-semibold"
              text={"Comenzar ahora"}
              color="purple"
            />
          </div>
        </div>

        {/* -- CUADRO DE LOGIN -- */}
        <div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-80 mx-auto mt-10 flex flex-col items-center text-white gap-10">

            {/* -- titulo -- */}
            <div className="flex flex-col items-center text-center gap-2">
              <h2 className="text-2xl font-semibold">Inicia sesion o registrate</h2>
              <p className="text-white/60">
                Usa tu correo electronico u otro servicio para acceder a Canva
                gratis.
              </p>
            </div>

            {/* -- botones -- */}
            <div className="flex flex-col space-y-4 mt-4 w-full">
              <ButtonLink
                to="/login"
                className="text-2xl font-semibold w-full"
                text={"Iniciar Sesion"}
                color="blue"
                icon={<IoIosLogIn/>}
              />
            </div>

            {/* -- footer -- */}
            <div className="text-white/60 text-sm mt-6 text-center">
              <p>
                Al continuar, aceptas los Términos y condiciones de uso de Canva. Consulta nuestra Política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
