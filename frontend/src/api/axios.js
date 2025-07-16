import axios from "axios";


// -- Crea la Instancia de AXIOS, basandose en AXIOS GLOBAL
const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});


export default instance;