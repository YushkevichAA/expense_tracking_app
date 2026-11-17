import type { AxiosResponse } from "axios";
import type { IOperation, IPayment } from "../shared/types";
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

// получение платежа
export async function getAllPaymentsService() {
  return await apiClient.get("/payment");
}

// получение одного платежа
export async function getPaymentByIdService(id: string) {
  return await apiClient.get(`/payment/${id}`);
}

// получение одного платежа
export async function setPaymentService(payment: Omit<IPayment, "id">) {
  return await apiClient.post(`/payment`, payment);
}

// обновление одного платежа
export async function patchPaymentService(
  payment: IPayment,
): Promise<AxiosResponse<IPayment>> {
  const { id, ...data } = payment;
  return await apiClient.patch(`/payment/${id}`, data);
}

// обновление одного платежа
export async function deletePaymentService(id: string) {
  return await apiClient.delete(`/payment/${id}`);
}
