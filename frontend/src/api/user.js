import axios from "./axios";


// -- Obtener Perfil de Usuario
export const getUserProfile = (token) => {
  return axios.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
