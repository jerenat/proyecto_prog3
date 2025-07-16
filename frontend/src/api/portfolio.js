import axios from "./axios";

// -- Obtener Portafolio
export const getPortfolio = () => axios.get(`/portfolio`);

// -- Obtener portafolio por ID
export const getPortfolioById = (id) => axios.get(`/portfolio/${id}`);

// -- Crear Portafolio
export const postFormPortfolio = (data) => axios.post(`/portfolio`, data);

// -- Editar Portafolio
export const putFormPortfolio = (id, data) =>
  axios.put(`/portfolio/${id}`, data);


// -- Eliminar Portafolio
export const deletePortfolio = (portfolioId) => axios.delete(`/portfolio/${portfolioId}`);
