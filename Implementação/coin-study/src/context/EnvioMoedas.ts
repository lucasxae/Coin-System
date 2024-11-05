import axios from 'axios';

const apiUrl = 'http://localhost:8080/Professor'; 

export const createEnvio = async (body) => {
    try {
        const response = await axios.post(`${apiUrl}/enviarMoedas`, body);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar ajuste:', error);
        throw error;
    }
};
