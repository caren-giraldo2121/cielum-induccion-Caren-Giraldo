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