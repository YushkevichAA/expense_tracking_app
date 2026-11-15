import apiClient from "./httpClient.service";

// получение информации по авторизованному пользователю
export async function checkAuthBackend() {
  return await apiClient.get("/auth/check");
}

// регистрация
export async function signUp(data: { email: string; password: string }) {
  return await apiClient.post("/users", data);
}

// авторизация
export async function signIn(data: { email: string; password: string }) {
  return await apiClient.post("/users", data);
}
