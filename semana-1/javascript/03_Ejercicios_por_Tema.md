## console.log("1. Inicio del script");

## setTimeout(() => {
    console.log("2. Timeout ejecutado (Macrotarea)");
}, 0);

## Promise.resolve().then(() => {
    console.log("3. Promesa resuelta (Microtarea)");
});

## console.log("4. Fin del script");

El código se ejecuta por prioridades en el Event Loop: primero las instrucciones normales
 (console.log), luego las promesas (Promise.resolve().then) en una "fila VIP" con prioridad absoluta,
  y al final los temporizadores (setTimeout), sin importar que tengan cero milisegundos de retraso. 
  Por eso las promesas siempre se imprimen antes que los timeouts.
  
1. Inicio del script
4. Fin del script
3. Promesa resuelta (Microtarea)
2. Timeout ejecutado (Macrotarea)

----------------------------------------------------------------------------------------------------------

# 10 EJERCICIOS BÁSICOS DE PYTHON


# 1. Declaración de Variables y Tipos de Datos
nombre = "Caren"
edad = 25
estudiando = True

print("--- Ejercicio 1 ---")
print(f"Nombre: {nombre} (Tipo: {type(nombre)})")
print(f"Edad: {edad} (Tipo: {type(edad)})")
print(f"Estudiando: {estudiando} (Tipo: {type(estudiando)})\n")


# 2. Operaciones Matemáticas Básicas
def operaciones_basicas(a, b):
    return {
        "suma": a + b,
        "resta": a - b,
        "multiplicacion": a * b,
        "division": a / b if b != 0 else "Error: División por cero"
    }

print("--- Ejercicio 2 ---")
print(operaciones_basicas(10, 5))
print()


# 3. Verificación de Mayoría de Edad
def verificar_edad(edad_persona):
    if edad_persona >= 18:
        return "Es mayor de edad"
    else:
        return "Es menor de edad"

print("--- Ejercicio 3 ---")
print(verificar_edad(20))
print()


# 4. Números Pares e Impares
print("--- Ejercicio 4 ---")
for i in range(1, 11):
    estado = "Par" if i % 2 == 0 else "Impar"
    print(f"Número {i}: {estado}")
print()


# 5. Suma de una Lista de Elementos
numeros = [10, 20, 30, 40]
print("--- Ejercicio 5 ---")
print(f"Lista: {numeros}")
print(f"Suma total: {sum(numeros)}")
print()


# 6. Invertir una Cadena de Texto
def invertir_texto(texto):
    return texto[::-1]

print("--- Ejercicio 6 ---")
print(invertir_texto("Python"))
print()


# 7. Filtrar Elementos Mayores a un Valor
lista_original = [2, 5, 8, 3, 10, 1, 6]
mayores_a_cinco = [n for n in lista_original if n > 5]

print("--- Ejercicio 7 ---")
print(f"Original: {lista_original}")
print(f"Mayores a 5: {mayores_a_cinco}")
print()


# 8. Buscar el Número Mayor
def obtener_mayor(lista):
    return max(lista)

print("--- Ejercicio 8 ---")
print(f"El número mayor de {numeros} es: {obtener_mayor(numeros)}")
print()


# 9. Uso de Diccionarios
estudiante = {
    "nombre": "Caren",
    "carrera": "Ingeniería de Sistemas",
    "materias": ["Bases de Datos", "Programación", "Redes"]
}

print("--- Ejercicio 9 ---")
print(f"Estudiante: {estudiante['nombre']}, Carrera: {estudiante['carrera']}, Materias: {', '.join(estudiante['materias'])}")
print()


# 10. Manejo Básico de Excepciones
print("--- Ejercicio 10 ---")
entrada = "123"  # Puedes cambiar esto por una letra como "abc" para probar el error
try:
    numero_convertido = int(entrada)
    print(f"Conversión exitosa: {numero_convertido}")
except ValueError:
    print("Error: No se pudo convertir el texto ingresado a un número entero.")

-------------------------------------------------------------------------------------------------
## tabla de ejemplo
CREATE TABLE ventas (
    id_venta INT,
    categoria VARCHAR(50),
    monto DECIMAL(10,2),
    fecha DATE
);

INSERT INTO ventas (id_venta, categoria, monto, fecha) VALUES
(1, 'Electronica', 150.00, '2026-01-01'),
(2, 'Electronica', 200.00, '2026-01-02'),
(3, 'Ropa', 50.00, '2026-01-01'),
(4, 'Ropa', 80.00, '2026-01-03');



SELECT 
    id_venta,
    categoria,
    monto AS monto_sin_iva,
    -- Calcular el 19% del IVA de manera dinámica
    monto * 0.19 AS valor_iva,
    -- Calcular el total a pagar sumando el monto más el IVA
    monto * 1.19 AS total_con_iva
FROM ventas;


id V Categoria  monto sin iva  valor iva  total con iva
1	Electronica	150.00	        28.5000	    178.5000
2	Electronica	200.00	        38.0000	    238.0000
3	Ropa	    50.00     	    9.5000	    59.5000
4	Ropa	    80.00	         15.2000	95.2000
1	Electronica	150.00	        28.5000	    178.5000
2	Electronica	200.00	        38.0000 	238.0000
3	Ropa	    50.00	        9.5000	    59.5000
4	Ropa	    80.00	        15.2000	    95.2000
1	Electronica	150.00	       28.5000	    178.5000
2	Electronica	200.00	      38.0000	    238.0000
3	Ropa	    50.00     	  9.5000	    59.5000
4	Ropa	    80.00	      15.2000	    95.2000
1	Electronica	150.00	      28.5000	    178.5000
2	Electronica	200.00	      38.0000	    238.0000
3	Ropa	    50.00    	  9.5000	     59.5000
4	Ropa	    80.00	      15.2000	    95.2000
1	Electronica	150.00	      28.5000	     178.5000
2	Electronica	200.00	      38.0000	     238.0000
3	Ropa	    50.00     	 9.5000	        59.5000
4	Ropa	    80.00	     15.2000	    95.2000
1	Electronica	150.00	     28.5000	    178.5000
2	Electronica	200.00	     38.0000	    238.0000
3	Ropa	    50.00	     9.5000	        59.5000
4	Ropa	    80.00	     15.2000	    95.2000