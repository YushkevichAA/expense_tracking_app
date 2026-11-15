import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // тот же origin, запрос идёт через прокси Vite
  timeout: 10000, // 10 секунд
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default apiClient;
