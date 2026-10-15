import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header className="topbar">
        <strong className="brand">Pedidos</strong>
        <nav>
          <NavLink to="/pedidos" end>Listado</NavLink>
          <NavLink to="/pedidos/nuevo">Nuevo pedido</NavLink>
          <NavLink to="/ejercicios">Ejercicios</NavLink>
        </nav>
        <button className="btn btn-ghost" onClick={() => { logout(); navigate("/login"); }}>
          Cerrar sesión
        </button>
      </header>
      <main className="container"><Outlet /></main>
    </>
  );
}