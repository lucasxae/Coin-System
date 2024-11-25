import { useNavigate } from "react-router-dom";

const Sidebar = ({ userType }: any) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => navigate("/")}
            className="w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Início
          </button>
        </li>
        <li>
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded">
            Saldo
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Configurações
          </button>
        </li>
        {userType !== "ALUNO" && (
          <li>
            <button
              onClick={() => navigate("/envio-moedas")}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Enviar Moedas
            </button>
          </li>
        )}
        {userType === "Empresa" && (
          <li>
            <button
              onClick={() => navigate("/cadastrar-vantagens")}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Cadastrar Vantagens
            </button>
          </li>
        )}
          {userType === "ALUNO" && (
          <li>
            <button
              onClick={() => navigate("/minhas-vantagens")}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Minhas Vantagens
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
