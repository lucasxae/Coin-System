import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/AuthContext";

export function App() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}

export default App;
