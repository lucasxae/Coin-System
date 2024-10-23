import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import EditProfile from "../pages/EditProfile/EditProfile";
import { ProtectedRoute, UnauthenticatedRoute } from "./ProtectedRoutes";

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
      {
        path: "login",
        element: (
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
