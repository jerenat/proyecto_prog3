import axios from "./axios";

export const getPortfolio = () => axios.get(`/portfolio`);

export const getPortfolioById = (id) => axios.get(`/portfolio/${id}`);

export const postFormPortfolio = (data) => axios.post(`/portfolio`, data);

export const putFormPortfolio = (id, data) =>
  axios.put(`/portfolio/${id}`, data);

export const deletePortfolio = (portfolioId) => axios.delete(`/portfolio/${portfolioId}`);
