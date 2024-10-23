import { useAuth } from "@/context/AuthContext";

const Header = ({ name, role }: any) => {
  const { isAuthenticated, user, logout } = useAuth();

  const getRoleName =
    role[0].charAt(0).toUpperCase() + role[0].slice(1).toLowerCase();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">
        Painel do {getRoleName}
      </h1>
      <div className="flex items-center space-x-4">
        {isAuthenticated() && (
          <>
            <p className="text-gray-700">Olá, {name}</p>
            <button
              onClick={logout}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
