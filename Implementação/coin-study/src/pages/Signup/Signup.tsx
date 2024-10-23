import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
  cpf: string;
};

const validation = Yup.object().shape({
  username: Yup.string().required("Campo obrigatório."),
  email: Yup.string().email("E-mail inválido.").required("Campo obrigatório."),
  password: Yup.string()
    .min(4, "A senha deve possuir no mínimo 4 dígitos.")
    .max(16, "A senha é grande demais.")
    .required("Campo obrigatório."),
  cpf: Yup.string().required(),
});

const Signup = () => {
  const { register: authRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(validation) });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (form: RegisterForm) => {
    setLoading(true);
    try {
      authRegister(form.username, form.email, form.password, form.cpf, "ALUNO");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Cadastro no Sistema de Mérito
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Digite seu nome completo"
              {...register("username")}
            />
            {errors.username ? (
              <p className="text-red-500 text-xs pt-1">
                {errors.username.message}
              </p>
            ) : (
              ""
            )}
          </div>

          <div>
            <label htmlFor="cpf" className="block text-gray-700">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Digite seu CPF"
              {...register("cpf")}
            />
            {errors.cpf ? (
              <p className="text-red-500 text-xs pt-1">{errors.cpf.message}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Digite seu email"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-red-500 text-xs pt-1">
                {errors.email.message}
              </p>
            ) : (
              ""
            )}
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-red-500 text-xs pt-1">
                {errors.password.message}
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
