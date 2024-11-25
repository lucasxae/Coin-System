import React, { useEffect, useState } from "react";
import axios from "axios";
import { roleChecker } from "@/utils/RoleChecker";
import { useAuth } from "@/context/AuthContext";




const Benefits = ({ userType, empresaId }: any) => {
  console.log("id", empresaId);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [filteredBenefits, setFilteredBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [popupMessage, setPopupMessage] = useState<string | null>(null); 


  const { user } = useAuth();

  const TrocarBeneficio = async (alunoId, vantagemId) => {
    try {
        const response = await axios.post(`http://localhost:8080/Alunos/${alunoId}/trocar-moedas?idVantagem=${vantagemId}`);
        await setPopupMessage("Vantagem trocada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return response.data;
    } catch (error) {
      setPopupMessage("Erro ao trocar vantagem. Tente novamente.");
        console.error('Erro ao comprar vantagem:', error);
        console.log(`user: ${alunoId}`);
        console.log(`vantagem: ${vantagemId}`);

        throw error;
    }
};

  useEffect(() => {
    const fetchBenefits = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/Vantagens");
        setBenefits(response.data);
        if (roleChecker(userType, "Empresa") && empresaId) {
          const empresaBenefits = response.data.filter(
            (benefit: any) => benefit.empresa.id === empresaId
          );

          console.log("Empresa Benefits:", empresaBenefits);
          setFilteredBenefits(empresaBenefits);
        } else {
          setFilteredBenefits(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar as vantagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, [userType, empresaId]);

  const closePopup = () => setPopupMessage(null);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-800">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">
        {userType === "Empresa"
          ? "Vantagens cadastradas"
          : "Vantagens Disponíveis"}
      </h2>
      <div className="space-y-4">
        {filteredBenefits.length > 0 ? (
          filteredBenefits.map((vantagem: any, index: number) => (
            <div
              key={vantagem.id}
              className={`${
                index === filteredBenefits.length - 1 ? "" : "border-b pb-4"
              }`}
            >
              <div className="flex flex-row items-center gap-4">
                <div>
                  {vantagem.foto && (
                    <img
                      src={vantagem.foto}
                      alt={vantagem.titulo}
                      className="h-24 w-24 mt-2 h-auto rounded-md object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{vantagem.titulo}</h3>
                  <p className="text-sm text-gray-600">{vantagem.descricao}</p>
                  <p className="text-green-500 font-bold mt-2">
                    {vantagem.valor} Moedas
                  </p>
                  {userType == "ALUNO" && (
                  <button
                type="submit"
                onClick={() => TrocarBeneficio(user.email, vantagem.id)}
                className=" w-fill bg-green-600 text-white p-2 rounded hover:bg-green-800 transition duration-200"
              >
                Trocar Vantagem
              </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma vantagem disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Benefits;
