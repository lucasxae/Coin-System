import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email("E-mail inválido.").required("Campo obrigatório."),
  password: Yup.string()
    .min(4, "A senha deve possuir no mínimo 4 dígitos.")
    .max(16, "A senha é grande demais.")
    .required("Campo obrigatório."),
});

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState("ALUNO");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginForm) => {
    console.log("aaa");
    localStorage.setItem("userEmail", form.email);

    login(form.email, form.password, role);
  };

  console.log(errors);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Eu sou:
            </label>
            <select
              id="role"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="seuemail@exemplo.com"
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
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
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
