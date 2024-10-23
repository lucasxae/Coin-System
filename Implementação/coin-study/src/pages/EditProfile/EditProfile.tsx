import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { getUserData, updateUserData } from "@/context/UserContext";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const [userData, setUserData] = useState<any | null>(null);
  const [editableUser, setEditableUser] = useState<any | null>(null);

  console.log("user", user.role);
  console.log(isAuthenticated());

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserData(user || "");
        console.log(userData);
        if (userData) {
          setUserData(userData);
          setEditableUser({ ...userData });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        [name]: value,
      });
    }
  };

  const handleSaveChanges = async (e: any) => {
    e.preventDefault(); // Previna o comportamento padrão do formulário
    if (
      user &&
      editableUser &&
      JSON.stringify(user) !== JSON.stringify(editableUser)
    ) {
      try {
        console.log("userEditable", editableUser);
        await updateUserData(user, editableUser);
        alert("As informações foram atualizadas com sucesso!");
        setUserData({ ...editableUser });
      } catch (error) {
        console.error("Erro ao atualizar as informações:", error);
        alert("Ocorreu um erro ao tentar salvar as alterações.");
      }
    } else {
      alert("Nenhuma alteração foi detectada.");
    }
  };

  const resetEditableUser = () => {
    if (userData) {
      setEditableUser({ ...userData });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <div className="rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Editar Perfil
            </h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={editableUser?.nome || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Atualize seu nome"
                />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-gray-700">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={editableUser?.cpf || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Atualize seu CPF"
                />
              </div>
              <div>
                <label htmlFor="rg" className="block text-gray-700">
                  RG
                </label>
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  value={editableUser?.rg || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Atualize seu RG"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleSaveChanges}
              >
                Atualizar
              </button>
              <button
                type="button"
                className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200"
                onClick={resetEditableUser}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
