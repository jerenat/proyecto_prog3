import { useState, useEffect } from "react";
import { FaUserAlt, FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./Button";

import Logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || user.email.split("@")[0]);
      setEmail(user.email);
    }
  }, [user]);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      setToggleMenu(false);
      navigate("/");
    } else {
      console.error("Error al cerrar sesión:", response.error);
    }
  };

  return (
    <nav className="w-full bg-black/40 py-4 px-6 flex flex-row justify-between items-center gap-4 shadow-lg">
      <ul className="flex flex-row gap-6 items-center">
        <li className="pr-5">
          <img src={Logo} alt="canva logo" />
        </li>
        <li>
          {isAuthenticated ? (
            <a href="/home" className="font-medium text-[1.1rem] outline-none">
              Portal
            </a>
          ) : (
            <a href="/" className="font-medium text-[1.1rem] outline-none">
              Inicio
            </a>
          )}
        </li>
        {isAuthenticated ? (
          <li>
            <a href="/home" className="font-medium text-[1.1rem] outline-none">
              Mi Portfolio
            </a>
          </li>
        ) : (
          <li>
            <a href="/login" className="font-medium text-[1.1rem] outline-none">
              Login
            </a>
          </li>
        )}
      </ul>

      <ul className="flex flex-row gap-6 items-center">
        {isAuthenticated && user ? (
          <>
            <li>
              <button
                className="bg-gray-600 rounded-full p-2 hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={handleToggleMenu}
              >
                <FaUserAlt />
              </button>

              {toggleMenu && (
                <div className="absolute right-3 mt-3.5 bg-white shadow-lg rounded-md py-4 px-7 z-20">
                  <p className="font-medium text-lg text-black">
                    {name || "Usuario"}
                  </p>
                  <p className="text-sm text-gray-600">{email || ""}</p>

                  <div className="mt-4">
                    <ButtonLink text={"Cerrar sesion"} onClick={handleLogout} />
                  </div>
                </div>
              )}
            </li>
          </>
        ) : (
          <li className="flex flex-row gap-2 items-center align-center">
            <FaRegUserCircle size={25}/>
           <h2>Invitado</h2>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
