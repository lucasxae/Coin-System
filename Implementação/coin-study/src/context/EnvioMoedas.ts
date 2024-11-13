import axios from 'axios';

const apiUrlProf = 'http://localhost:8080/Professor'; 

export const createEnvio = async (body: any) => {
    try {
        const response = await axios.post(`${apiUrlProf}/enviarMoedas`, body);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar ajuste:', error);
        throw error;
    }
};

const apiUrlGetAlunos = 'http://localhost:8080/Alunos'; 

export const getAlunos = async () => {
    try {
        const response = await axios.get(apiUrlGetAlunos);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter alunos:', error);
        throw error;
    }
};