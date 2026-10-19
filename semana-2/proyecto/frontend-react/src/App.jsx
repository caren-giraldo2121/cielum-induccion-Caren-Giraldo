import { Routes, Route, Navigate } from "react-router-dom";
import RutaProtegida from "./auth/RutaProtegida.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import NuevoPedido from "./pages/NuevoPedido.jsx";
import Ejercicios from "./Ejercicios/Ejercicios.jsx";

// Layout de las páginas privadas: barra de navegación + contenedor.
function Privado({ children }) {
  return (
    <RutaProtegida>
      <Navbar />
      <div className="container">{children}</div>
    </RutaProtegida>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/pedidos" replace />} />
      <Route path="/pedidos" element={<Privado><Pedidos /></Privado>} />
      <Route path="/pedidos/nuevo" element={<Privado><NuevoPedido /></Privado>} />
      <Route path="/ejercicios" element={<Privado><Ejercicios /></Privado>} />
      <Route path="*" element={<Navigate to="/pedidos" replace />} />
    </Routes>
  );
}
