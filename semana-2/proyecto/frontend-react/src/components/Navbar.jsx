import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const clase = ({ isActive }) => (isActive ? "activo" : "");

  return (
    <header className="navbar">
      <div className="brand">Cielum</div>
      <nav>
        <NavLink to="/pedidos" className={clase}>Pedidos</NavLink>
        <NavLink to="/pedidos/nuevo" className={clase}>Nuevo pedido</NavLink>
        <NavLink to="/ejercicios" className={clase}>Ejercicios</NavLink>
      </nav>
      <div className="spacer" />
      {usuario && <span className="usuario">{usuario.nombre}</span>}
      <button className="secundario sm" onClick={salir}>Salir</button>
    </header>
  );
}
