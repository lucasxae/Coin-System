import axios from "axios";

export const createBenefit = async (benefitData: any) => {
  console.log("Before submitting: ", benefitData);
  try {
    const response = await axios.post(
      "http://localhost:8080/Vantagens",
      benefitData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar o benefício:", error);
    throw error;
  }
};
