import BalanceCard from "@/components/BalanceCard/BalanceCard";
import Benefits from "@/components/Benefits/Benefits";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {};

const Home = (props: Props) => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async (role: string) => {
    setLoading(true);
    try {
      let response;
      if (role === "ALUNO") {
        response = await axios.get(
          `http://localhost:8080/Alunos/${user.email}`
        );
      } else {
        response = await axios.get(
          `http://localhost:8080/Professor/${user.email}`
        );
      }
      setUserData(response.data);
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

  console.log(isAuthenticated());

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header
          name={userData?.nome || "Nome não disponível"}
          role={userData?.roles || ["Usuário"]}
        />
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BalanceCard balance={userData?.creditos || 0} />
            <TransactionTable />
          </div>
          <div className="mt-8">
            <Benefits />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
