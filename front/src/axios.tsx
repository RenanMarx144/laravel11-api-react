import axios from "axios";

// URL base da API (substitui pelo URL da tua aplicação Laravel, ex.: http://127.0.0.1:8000)
const API_BASE_URL = 'http://localhost';


// Cria a instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL, // Define a URL base para todas as chamadas
  withCredentials: true, // Fundamental para enviar cookies entre backend e frontend
  headers: {
    "X-Requested-With": "XMLHttpRequest", // Necessário para Laravel
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token); // 👈 Decodifica
  }

  return config;
});

export default api;
