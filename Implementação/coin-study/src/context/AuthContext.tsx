import React, { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/AuthService";
import { deleteUser } from "../context/UserContext";

type UserContextType = {
  user: any | null;
  register: (
    email: string,
    password: string,
    username: string,
    cpf: string,
    role: string
  ) => void;
  login: (email: string, password: string, role: string) => void;
  logout: () => void;
  deleteAccount: (user: any) => void;
  isAuthenticated: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setIsLoggedIn(true);
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string,
    cpf: string
  ) => {
    await registerApi(email, cpf, password, username)
      .then((response) => {
        if (response) {
          window.alert("User registered successfully!");
          navigate("/login");
        }
      })
      .catch(() => window.alert("ERRO CADASTRO"));
  };

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await loginApi(email, password, role);
      if (response) {
        const userObj = { email, role };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        window.alert("User logged in successfully!");
        navigate("/");
      }
    } catch {
      window.alert("ERRO LOGIN");
    }
  };

  const deleteAccount = async (user: any) => {
    await deleteUser(user);
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        login,
        user,
        register,
        logout,
        isAuthenticated,
        deleteAccount,
      }}
    >
      {isLoggedIn ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
