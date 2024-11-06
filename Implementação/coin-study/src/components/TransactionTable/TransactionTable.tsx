import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const apiUrlProf = 'http://localhost:8080/Extrato/professor?professorId='; 
const apiUrlAluno = 'localhost:8080/Extrato?alunoId=';

const getExtratoProfessor = async (login) => {
  try {
      const response = await axios.get(`${apiUrlProf}${login}`);
      return response.data;
  } catch (error) {
      console.error('Erro ao obter extrato do professor:', error);
      throw error;
  }
};

const getExtratoAluno = async (login) => {
  try {
      const response = await axios.get(`${apiUrlAluno}${login}`);
      return response.data;
  } catch (error) {
      console.error('Erro ao obter extrato do aluno:', error);
      throw error;
  }
};

const TransactionTable = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      console.log("Entrei ...");

       try {
          let data;
          if (user.role == "Professor") {
             console.log("Carregando extrato do professor com login:", user.email);
             data =  getExtratoProfessor(user.login);
          } else {
             console.log("Carregando extrato do aluno com login:", user.email);
             data =  getExtratoAluno(user.login);
          }
          console.log("Extrato carregado:", data);
          setTransactions(data);
       } catch (error) {
          console.error("Erro ao carregar o extrato:", error);
       } finally {
          setLoading(false);
       }
 },[] );

  if (loading) return <p>Carregando extrato...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
      <h2 className="text-xl font-semibold mb-4">Histórico de Moedas</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Data</th>
            <th className="py-2">Mensagem</th>
            <th className="py-2">Montante</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2">{new Date(transaction.dataEnvio).toLocaleDateString()}</td>
                <td className="py-2">{transaction.mensagem}</td>
                <td
                  className={`py-2 ${
                    transaction.valorEnviado > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.valorEnviado > 0 ? `+${transaction.valorEnviado}` : transaction.valorEnviado} Moedas
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 text-center">
                Nenhuma transação encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;