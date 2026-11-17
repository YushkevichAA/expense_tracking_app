import type { AxiosResponse } from "axios";
import type { IOperation } from "../shared/types";
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

// получение операций
export async function getAllTransactions() {
  return await apiClient.get("/operation");
}

// получение одной операции
export async function getTransactionById(id: string) {
  return await apiClient.get(`/operation/${id}`);
}

// получение одной операции
export async function setTransaction(operation: Omit<IOperation, "id">) {
  return await apiClient.post(`/operation`, operation);
}

// обновление одной операции
export async function patchTransactionService(
  operation: IOperation,
): Promise<AxiosResponse<IOperation>> {
  const { id, ...data } = operation;
  return await apiClient.patch(`/operation/${id}`, data);
}

// обновление одной операции
export async function deleteTransaction(id: string) {
  return await apiClient.delete(`/operation/${id}`);
}
