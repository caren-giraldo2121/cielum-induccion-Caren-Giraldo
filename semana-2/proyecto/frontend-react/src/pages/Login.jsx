import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { Mensaje } from "../components/ui.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const destino = params.get("redirect") ? decodeURIComponent(params.get("redirect")) : "/pedidos";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      return setError("Ingresa tu correo y contraseña.");
    }
    setEnviando(true);
    try {
      await login(form.email, form.password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.status === 401 ? "Correo o contraseña incorrectos." : err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={onSubmit}>
        <div className="marca">Cielum</div>
        <div className="lema">Panel de pedidos</div>

        <Mensaje tipo="error">{error}</Mensaje>

        <div className="field">
          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" autoComplete="username"
                 placeholder="tucorreo@cielum.com" value={form.email} onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password"
                 placeholder="••••••" value={form.password} onChange={onChange} />
        </div>

        <button type="submit" style={{ width: "100%" }} disabled={enviando}>
          {enviando ? "Entrando…" : "Iniciar sesión"}
        </button>

        <p className="pista">Prueba: caren@cielum.com / 123456</p>
      </form>
    </div>
  );
}
