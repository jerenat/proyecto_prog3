import axios from "./axios";

// -- Crea una peticion POST de Registo de usuario
export const registerRequest = (user) => axios.post(`/auth/register`, user);

// -- Crea una peticion POST de Logueo de Usuarios
export const loginRequest = (user) => axios.post(`/auth/login`, user);

// -- VERIFICAR SI EXISTE EL TOKEN
export const verifyTokenRequest = () => axios.get("/auth/verify");

// -- Cierra la sesion del usuario
export const verifyLogout = async () => axios.get("/auth/logout");
