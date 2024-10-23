import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import EditProfile from "../pages/EditProfile/EditProfile";
import ProtectedRoute from "./ProtectedRoutes"; // Ajuste o caminho conforme necessário

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "edit-profile", element: <EditProfile /> },
    ],
  },
]);
