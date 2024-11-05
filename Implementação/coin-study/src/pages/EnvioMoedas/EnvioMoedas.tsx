import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { createEnvio } from "@/context/EnvioMoedas";
import React, { useState, useEffect } from "react";

const EnvioMoedas = () => {
  const { user } = useAuth();
  const [newEnvio, setNewEnvio] = useState({
    loginAluno: '',
    loginProfessor: user?.email || '', 
    quantidadeMoedas: ''
  });

  useEffect(() => {
    if (user?.email) {
      setNewEnvio(prev => ({
        ...prev,
        loginProfessor: user.email 
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnvio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Antes de enviar: ", newEnvio);  

    try {
      await createEnvio(newEnvio);
      alert("Moedas enviadas com sucesso!");
      setNewEnvio({ loginAluno: '', loginProfessor: user.email || '', quantidadeMoedas: '' });
    } catch (error) {
      console.error("Erro ao enviar moedas:", error);
      alert("Ocorreu um erro ao enviar as moedas.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-col items-start p-10 bg-gray-100 min-h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-left mb-6">
              Enviar Moedas
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="loginAluno" className="block text-gray-700">
                  Login do Aluno
                </label>
                <input
                  type="text"
                  id="loginAluno"
                  name="loginAluno"
                  value={newEnvio.loginAluno}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Insira o login do aluno"
                  required
                />
              </div>
              <div>
                <label htmlFor="loginProfessor" className="block text-gray-700">
                  Seu login
                </label>
                <input
                  type="text"
                  id="loginProfessor"
                  name="loginProfessor"
                  value={newEnvio.loginProfessor} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Seu login"
                  required
                  readOnly 
                />
              </div>
              <div>
                <label htmlFor="quantidadeMoedas" className="block text-gray-700">
                  Quantidade de Moedas
                </label>
                <input
                  type="number"
                  id="quantidadeMoedas"
                  name="quantidadeMoedas"
                  value={newEnvio.quantidadeMoedas}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Insira a quantidade de moedas"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Enviar Moedas
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvioMoedas;
