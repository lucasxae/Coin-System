import axios from "axios";
import { handleError } from "../utils/ErrorHandler";
import { roleChecker } from "@/utils/RoleChecker";

export const getUserData = async (user: any) => {
  console.log("getUserData", user.role);
  try {
    let response;
    if (roleChecker(user.role, "ALUNO")) {
      response = await axios.get(`http://localhost:8080/Alunos/${user.email}`);
    } else if (roleChecker(user.role, "PROFESSOR")) {
      response = await axios.get(
        `http://localhost:8080/Professor/${user.email}`
      );
    } else {
      response = await axios.get(
        `http://localhost:8080/empresa/email?email=${user.email}`
      );
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserData = async (user: any, data: any) => {
  try {
    let response;
    if (roleChecker(user.role, "ALUNO")) {
      response = await axios.put(
        `http://localhost:8080/Alunos/${user.email}`,
        data
      );
    } else if (roleChecker(user.role, "PROFESSOR")) {
      response = await axios.put(
        `http://localhost:8080/Professor/${user.email}`,
        data
      );
    } else {
      response = await axios.put(
        `http://localhost:8080/empresa/${user.email}`,
        data
      );
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (user: any) => {
  try {
    let response;
    if (user.role === "ALUNO") {
      response = await axios.delete(
        `http://localhost:8080/Alunos/${user.email}`
      );
    } else {
      response = await axios.delete(
        `http://localhost:8080/Professor/${user.email}`
      );
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
