import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { getUserData, updateUserData, deleteUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const { isAuthenticated, user, deleteAccount } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [editableUser, setEditableUser] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    e.preventDefault();
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

  const openDeleteModal = (id: string) => {
    setUserId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserId(null);
  };

  const handleDeleteAccount = async () => {
    if (userId) {
      try {
        deleteAccount(user);
      } catch (error) {
        console.error("Erro ao deletar a conta:", error);
        alert("Ocorreu um erro ao tentar deletar a conta.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userType={user.role} />
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-col items-start p-10 bg-gray-100 min-h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-left mb-6">
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
            <button
              type="button"
              className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
              onClick={() => openDeleteModal(user.email)}
            >
              Deletar Conta
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-4">
              Tem certeza de que deseja deletar sua conta? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white font-semibold rounded px-4 py-2 mr-2"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black font-semibold rounded px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
