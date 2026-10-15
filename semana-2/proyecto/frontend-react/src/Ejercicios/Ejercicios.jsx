import Contador from "./Contador";
import ListaTareas from "./ListaTareas";
import FormularioControlado from "./FormularioControlado";
import TablaProductos from "./TablaProductos";
import Avanzado from "./Avanzado";

export default function Ejercicios() {
  return (
    <>
      <div className="page-head"><h1>Ejercicios del día</h1></div>
      <h2>Básico</h2>
      <div className="grid"><Contador /><ListaTareas /><FormularioControlado /></div>
      <h2>Intermedio</h2>
      <TablaProductos />
      <h2>Avanzado</h2>
      <Avanzado />
    </>
  );
}