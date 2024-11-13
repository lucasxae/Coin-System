import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { createBenefit } from "@/context/BenefitContext";
import axios from "axios";
import { useEffect, useState } from "react";

const RegisterBenefit = () => {
  const { user } = useAuth();
  const [empresaData, setEmpresaData] = useState<any | null>(null);
  const [newBenefit, setNewBenefit] = useState({
    titulo: "",
    descricao: "",
    foto: "",
    idEmpresa: "",
    valor: "",
  });

  const getEmpresaData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/empresa/email?email=${user.email}`
      );
      setEmpresaData(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da empresa:", error);
      throw error;
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewBenefit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    newBenefit.idEmpresa = empresaData.id;

    try {
      await createBenefit(newBenefit);
      alert("Benefício registrado com sucesso!");
      setNewBenefit({
        titulo: "",
        descricao: "",
        foto: "",
        idEmpresa: "",
        valor: "",
      });
    } catch (error) {
      console.error("Erro ao registrar o benefício:", error);
      alert("Ocorreu um erro ao registrar o benefício.");
    }
  };

  useEffect(() => {
    getEmpresaData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar userType={user.role} />
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-col items-start p-10 bg-gray-100 min-h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-left mb-6">
              Registrar Benefício
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="titulo" className="block text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={newBenefit.titulo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Insira o título do benefício"
                  required
                />
              </div>
              <div>
                <label htmlFor="descricao" className="block text-gray-700">
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  value={newBenefit.descricao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Descreva o benefício"
                  required
                />
              </div>
              <div>
                <label htmlFor="foto" className="block text-gray-700">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  value={newBenefit.foto}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Insira a URL da imagem"
                  required
                />
              </div>
              <div>
                <label htmlFor="valor" className="block text-gray-700">
                  Valor
                </label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={newBenefit.valor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Insira o valor do benefício"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Registrar Benefício
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBenefit;
