// ==========================================
// EJERCICIOS DE FUNDAMENTOS DE JAVASCRIPT
// ==========================================

// 1. Tipos de datos y variables
let nombre = "Caren";
const edad = 25;
let esEstudiante = true;

console.log("--- Ejercicio 1 ---");
console.log("Nombre:", nombre, "| Tipo:", typeof nombre);
console.log("Edad:", edad, "| Tipo:", typeof edad);
console.log("Es estudiante:", esEstudiante, "| Tipo:", typeof esEstudiante);


// 2. Suma de dos números (Función tradicional)
function sumar(a, b) {
  return a + b;
}

console.log("\n--- Ejercicio 2 ---");
console.log("Suma (5 + 3):", sumar(5, 3));


// 3. Función flecha (Arrow Function) - Cálculo de edad según año de nacimiento
const calcularEdad = (anioNacimiento) => {
  const anioActual = 2026;
  return anioActual - anioNacimiento;
};

console.log("\n--- Ejercicio 3 ---");
console.log("Edad calculada:", calcularEdad(2000), "años");


// 4. Condicionales (Par o Impar)
let numeroEvaluar = 7;
console.log("\n--- Ejercicio 4 ---");
if (numeroEvaluar % 2 === 0) {
  console.log(`El número ${numeroEvaluar} es par.`);
} else {
  console.log(`El número ${numeroEvaluar} es impar.`);
}


// 5. Bucles (For) - Números del 1 al 10
console.log("\n--- Ejercicio 5 ---");
for (let i = 1; i <= 10; i++) {
  console.log("Número:", i);
}


// 6. Arreglos y métodos básicos
let ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
ciudades.push("Bucaramanga");

console.log("\n--- Ejercicio 6 ---");
console.log("Lista de ciudades actualizada:", ciudades);


// 7. Filtrar elementos de un arreglo (.filter)
const numerosOriginales = [3, 12, 5, 20, 8, 15];
const mayoresADiez = numerosOriginales.filter(num => num > 10);

console.log("\n--- Ejercicio 7 ---");
console.log("Números mayores a 10:", mayoresADiez);


// 8. Objetos en JavaScript
const usuario = {
  nombre: "Caren Giraldo",
  correo: "caren@example.com",
  activo: true,
  roles: ["Desarrollador", "Practicante"]
};

console.log("\n--- Ejercicio 8 ---");
console.log("Nombre del usuario en el objeto:", usuario.nombre);


// 9. Manipulación de cadenas (.length)
function obtenerLongitud(palabra) {
  return palabra.length;
}

console.log("\n--- Ejercicio 9 ---");
console.log("Cantidad de caracteres en 'Helpify':", obtenerLongitud("Helpify"));


// 10. Transformación de arreglos (.map)
const baseNumeros = [1, 2, 3, 4, 5];
const numerosMultiplicados = baseNumeros.map(num => num * 2);

console.log("\n--- Ejercicio 10 ---");
console.log("Números multiplicados por 2:", numerosMultiplicados);

// ==========================================
// EJERCICIO INTERMEDIO: GESTIÓN DE PEDIDOS
// ==========================================

// Arreglo de 20 pedidos ficticios
const pedidos = [
  { id: 1, cliente: "Ana Gómez", ciudad: "Bogotá", total: 150000, estado: "completado" },
  { id: 2, cliente: "Carlos Pérez", ciudad: "Medellín", total: 80000, estado: "pendiente" },
  { id: 3, cliente: "Lucía Torres", ciudad: "Cali", total: 220000, estado: "completado" },
  { id: 4, cliente: "Mateo Rojas", ciudad: "Bogotá", total: 95000, estado: "pendiente" },
  { id: 5, cliente: "Sofía Ruiz", ciudad: "Medellín", total: 310000, estado: "completado" },
  { id: 6, cliente: "Ana Gómez", ciudad: "Bogotá", total: 45000, estado: "completado" },
  { id: 7, cliente: "David Castro", ciudad: "Cali", total: 120000, estado: "pendiente" },
  { id: 8, cliente: "Elena Vargas", ciudad: "Barranquilla", total: 180000, estado: "completado" },
  { id: 9, cliente: "Carlos Pérez", ciudad: "Medellín", total: 250000, estado: "completado" },
  { id: 10, cliente: "Julian Morales", ciudad: "Bogotá", total: 60000, estado: "pendiente" },
  { id: 11, cliente: "Valeria Ríos", ciudad: "Cali", total: 135000, estado: "completado" },
  { id: 12, cliente: "Sofía Ruiz", ciudad: "Medellín", total: 90000, estado: "pendiente" },
  { id: 13, cliente: "Andrés Silva", ciudad: "Barranquilla", total: 400000, estado: "completado" },
  { id: 14, cliente: "Ana Gómez", ciudad: "Bogotá", total: 210000, estado: "pendiente" },
  { id: 15, cliente: "Lucía Torres", ciudad: "Cali", total: 75000, estado: "completado" },
  { id: 16, cliente: "Mateo Rojas", ciudad: "Bogotá", total: 160000, estado: "completado" },
  { id: 17, cliente: "David Castro", ciudad: "Cali", total: 110000, estado: "completado" },
  { id: 18, cliente: "Elena Vargas", ciudad: "Barranquilla", total: 230000, estado: "pendiente" },
  { id: 19, cliente: "Julian Morales", ciudad: "Bogotá", total: 195000, estado: "completado" },
  { id: 20, cliente: "Valeria Ríos", ciudad: "Cali", total: 85000, estado: "pendiente" }
];

// 1. Total vendido (usando reduce)
const totalVendido = pedidos.reduce((acumulador, pedido) => acumulador + pedido.total, 0);
console.log("--- 1. Total Vendido ---");
console.log(totalVendido);

// 2. Total por ciudad (usando reduce para agrupar)
const totalPorCiudad = pedidos.reduce((acc, pedido) => {
  acc[pedido.ciudad] = (acc[pedido.ciudad] || 0) + pedido.total;
  return acc;
}, {});
console.log("\n--- 2. Total por Ciudad ---");
console.log(totalPorCiudad);

// 3. Pedidos pendientes (usando filter)
const pedidosPendientes = pedidos.filter(pedido => pedido.estado === "pendiente");
console.log("\n--- 3. Pedidos Pendientes ---");
console.log(pedidosPendientes);

// 4. Pedido más caro (usando reduce)
const pedidoMasCaro = pedidos.reduce((max, pedido) => (pedido.total > max.total ? pedido : max), pedidos[0]);
console.log("\n--- 4. Pedido más Caro ---");
console.log(pedidoMasCaro);

// 5. Promedio de compra por cliente (usando reduce y map)
const resumenClientes = pedidos.reduce((acc, pedido) => {
  if (!acc[pedido.cliente]) {
    acc[pedido.cliente] = { sumaTotal: 0, cantidad: 0 };
  }
  acc[pedido.cliente].sumaTotal += pedido.total;
  acc[pedido.cliente].cantidad += 1;
  return acc;
}, {});

const promedioPorCliente = Object.keys(resumenClientes).map(cliente => ({
  cliente,
  promedio: resumenClientes[cliente].sumaTotal / resumenClientes[cliente].cantidad
}));
console.log("\n--- 5. Promedio por Cliente ---");
console.log(promedioPorCliente);