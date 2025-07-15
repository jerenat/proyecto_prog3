// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  verifyLogout,
} from "../api/auth";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  // Registro
  const signup = async (userData) => {
    try {
      const { data } = await registerRequest(userData);
      if (data.message === "OK") {
        setUser(data.user);
        setIsAuthenticated(true);
      }
      return data;
    } catch (err) {
      const errorMsg = err.response?.data || "Error al registrar usuario";
      return errorMsg;
    }
  };

  // Login corregido para actualizar estado
  const signin = async (userData) => {
    try {
      const { data } = await loginRequest(userData);
      if (data.message === "OK") {
        setUser(data.user); // Actualiza usuario en contexto
        setIsAuthenticated(true); // Marca como autenticado
      }
      return data;
    } catch (err) {
      const errorMsg = err.response?.data || "Error al iniciar sesión";
      return errorMsg;
    }
  };

  // Logout
  const logout = async () => {
    const onLogout = await verifyLogout();
    if (onLogout.status === 200) {
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    }
  };

  // Verificación de usuario al cargar
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await verifyTokenRequest();
        setUser(data);
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
