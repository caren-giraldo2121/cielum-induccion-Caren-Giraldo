import { Navigate, Route, Routes } from "react-router-dom";
import RutaProtegida from "./auth/RutaProtegida";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Pedidos from "./pages/Pedidos";
import NuevoPedido from "./pages/NuevoPedido";
import Ejercicios from "./Ejercicios/Ejercicios";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/nuevo" element={<NuevoPedido />} />
          <Route path="/ejercicios" element={<Ejercicios />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/pedidos" replace />} />
    </Routes>
  );
}