import Contador from "./Contador.jsx";
import ListaTareas from "./ListaTareas.jsx";
import FormularioControlado from "./FormularioControlado.jsx";
import TablaProductos from "./TablaProductos.jsx";
import Avanzado from "./Avanzado.jsx";

export default function Ejercicios() {
  return (
    <div>
      <h1 className="page-title">Ejercicios</h1>
      <p className="page-sub">Básico, intermedio y avanzado de React integrados con la API.</p>

      <h3 style={{ margin: "18px 0 10px" }}>Básico</h3>
      <div className="grid-ejercicios">
        <Contador />
        <ListaTareas />
        <FormularioControlado />
      </div>

      <h3 style={{ margin: "26px 0 10px" }}>Intermedio</h3>
      <TablaProductos />

      <h3 style={{ margin: "26px 0 10px" }}>Avanzado</h3>
      <Avanzado />
    </div>
  );
}
