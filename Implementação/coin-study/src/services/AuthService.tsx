import axios from "axios";
import { handleError } from "../utils/ErrorHandler";

const api = "http://localhost:8080/";

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const registerApi = async (
  name: string,
  cpf: string,
  email: string,
  password: string,
) => {
  try {
    const data = await axiosInstance.post("Alunos/register", {
      nome: name,
      cpf: cpf,
      login: email,
      senha: password,
      role: ["ALUNO"],
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginApi = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    const data = await axiosInstance.post("auth/login", {
      login: email,
      senha: password,
      role: role,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
