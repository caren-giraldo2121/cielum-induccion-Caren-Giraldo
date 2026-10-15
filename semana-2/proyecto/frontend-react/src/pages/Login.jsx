import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const destino = location.state?.from?.pathname || "/pedidos";
  if (isAuth) return <Navigate to={destino} replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) return setError("Ingresa tu correo y contraseña.");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.status === 401 ? "Correo o contraseña incorrectos." : err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="card login" onSubmit={onSubmit} noValidate>
        <h1>Iniciar sesión</h1>
        <label>Correo
          <input name="email" type="email" autoComplete="username" value={form.email} onChange={onChange} />
        </label>
        <label>Contraseña
          <input name="password" type="password" autoComplete="current-password" value={form.password} onChange={onChange} />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}