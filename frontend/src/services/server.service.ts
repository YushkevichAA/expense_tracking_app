import apiClient from "./httpClient.service";

// получение информации по авторизованному пользователю
export async function checkAuthService() {
  return await apiClient.get("/auth/check");
}

// регистрация
export async function signUpService(data: {
  email: string;
  username: string;
  password: string;
}) {
  return await apiClient.post("/auth/sign-up", data);
}

// авторизация
export async function signInService(data: { email: string; password: string }) {
  return await apiClient.post("/auth/sign-in", data);
}

// выход
export async function signOutService() {
  return await apiClient.post("/auth/sign-out");
}
