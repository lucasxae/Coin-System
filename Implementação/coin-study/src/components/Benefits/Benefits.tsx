import React, { useEffect, useState } from "react";
import axios from "axios";
import { roleChecker } from "@/utils/RoleChecker";

const Benefits = ({ userType, empresaId }: any) => {
  console.log("id", empresaId);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [filteredBenefits, setFilteredBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
                      className="h-24 w-24 mt-2 w-full h-auto rounded-md object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{vantagem.titulo}</h3>
                  <p className="text-sm text-gray-600">{vantagem.descricao}</p>
                  <p className="text-green-500 font-bold mt-2">
                    {vantagem.valor} Moedas
                  </p>
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
