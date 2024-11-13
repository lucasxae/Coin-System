import BalanceCard from "@/components/BalanceCard/BalanceCard";
import Benefits from "@/components/Benefits/Benefits";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import { roleChecker } from "@/utils/RoleChecker";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async (role: string) => {
    setLoading(true);
    try {
      let response;
      if (roleChecker(role, "aluno")) {
        response = await axios.get(
          `http://localhost:8080/Alunos/${user.email}`
        );
      } else if (roleChecker(role, "professor")) {
        response = await axios.get(
          `http://localhost:8080/Professor/${user.email}`
        );
      } else if (roleChecker(role, "empresa")) {
        response = await axios.get(
          `http://localhost:8080/empresa/email?email=${user.email}`
        );
      }
      if (response) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData(user.role);
  }, [user.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userType={user.role} />
      <div className="flex-1 bg-gray-100">
        <Header
          name={userData?.nome || "Nome não disponível"}
          role={userData?.role || ["Usuário"]}
        />
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BalanceCard balance={userData?.creditos || 0} />
            <TransactionTable />
          </div>
          <div className="mt-8">
            {!roleChecker(user.role, "professor") && (
              <Benefits userType={user.role} empresaId={userData.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
