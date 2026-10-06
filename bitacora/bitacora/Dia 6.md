# Bitácora Día 07-10 · [Repo inicial, README y entorno.md]
**Fecha:07/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. Subconsultas y EXISTS.

Subconsultas (Subqueries / Consultas Anidadas):
Son consultas SQL que se encuentran anidadas dentro de otra consulta principal (habitualmente utilizadas en cláusulas como WHERE, FROM o HAVING). Permiten descomponer operaciones complejas evaluando una sentencia interna cuyos resultados o conjuntos de tuplas sirven como criterio de filtro o datos derivados para la sentencia externa. Se clasifican en no correlacionadas (cuando la consulta interna es independiente y se ejecuta una sola vez) y correlacionadas (cuando la consulta interna utiliza referencias a variables de la consulta externa, evaluándose de forma iterativa por cada fila procesada).

Operador EXISTS:
Es una construcción o función lógica booleana diseñada para evaluar la existencia de filas en las relaciones, utilizada comúnmente junto con subconsultas correlacionadas. Devuelve el valor verdadero (true) si el resultado de la subconsulta no está vacío (es decir, encuentra al menos una tupla que cumpla la condición), y devuelve falso (false) si la subconsulta no retorna ningún resultado.

Fuente: Elmasri, R., & Navathe, S. B. (2007). Fundamentos de sistemas de bases de datos (5.ª ed.). Pearson Educación..

2. Vistas: ¿para qué sirven?

Una vista es una tabla virtual construida a partir del resultado de una consulta SQL almacenada. No almacena datos físicamente en el disco, sino que los calcula y muestra en tiempo real consultando las tablas base originales.

¿Para qué sirve?
Las vistas sirven para simplificar consultas complejas ocultando uniones y filtros tras una interfaz limpia, mejorar la seguridad al restringir el acceso a datos sensibles y garantizar la independencia lógica evitando que cambios en las tablas base afecten a las aplicaciones existentes.

Fuente: Elmasri, R., & Navathe, S. B. (2007). Fundamentos de sistemas de bases de datos (5.ª ed.). Pearson Educación.

3. CASE WHEN, COALESCE, manejo de NULL.

CASE WHEN
Es una estructura de control condicional en SQL que evalúa una lista de condiciones y devuelve un resultado específico para la primera condición que se cumpla. Si ninguna de las condiciones es verdadera, devuelve el valor especificado en la cláusula ELSE (o NULL por omisión).

COALESCE
Es una función estándar de SQL que acepta una lista de expresiones como argumentos y evalúa de izquierda a derecha devolviendo el primer valor que no sea nulo (not null). Si todos los argumentos proporcionados se evalúan como NULL, la función retorna NULL. Es ampliamente utilizada para la gestión limpia de valores faltantes y para evitar errores de propagación de nulos en cálculos aritméticos.

Manejo de NULL
En los sistemas de bases de datos relacionales, NULL no representa un valor cero o un espacio en blanco, sino la ausencia de valor o un valor desconocido. Su gestión se rige por la lógica de tres valores (three-valued logic), donde las operaciones lógicas y comparaciones que involucran un valor desconocido no resultan en verdadero (True) o falso (False), sino en un estado desconocido (Unknown), lo cual exige el uso de operadores específicos (IS NULL, IS NOT NULL) y funciones de sustitución para garantizar la integridad y consistencia en el procesamiento de los datos.

Fuente: Elmasri, R., & Navathe, S. B. (2007). Fundamentos de sistemas de bases de datos (5.ª ed.). Pearson Educación.

4. Diferencias de sintaxis: LIMIT vs TOP/OFFSET FETCH, SERIAL/IDENTITY, ILIKE vs LIKE con collation, concatenación, fechas (NOW() vs GETDATE()).

- Limitación de filas (LIMIT vs. TOP / OFFSET FETCH)
Se emplean para restringir el número de filas devueltas por una consulta (paginación).

Diferencia de sintaxis:
PostgreSQL: Utiliza las cláusulas LIMIT y OFFSET al final de la consulta (ej. LIMIT 10 OFFSET 5).
SQL Server: Tradicionalmente emplea SELECT TOP n al inicio, o bien el estándar ANSI con OFFSET m ROWS FETCH NEXT n ROWS ONLY al final.

- Generación de autonuméricos (SERIAL vs. IDENTITY)
Mecanismos para generar automáticamente valores secuenciales únicos en columnas de tipo entero, comúnmente usados para claves primarias.

Diferencia de sintaxis:
PostgreSQL: Utiliza el pseudotipo SERIAL (que por debajo crea y vincula una secuencia automática).
SQL Server: Emplea la propiedad de columna IDENTITY(semilla, incremento)

- Búsqueda insensible a mayúsculas (ILIKE vs. LIKE con collation)
Definición y uso: Operadores para realizar búsquedas de patrones en cadenas de texto sin discriminar entre mayúsculas y minúsculas.

Diferencia de sintaxis:
PostgreSQL: Ofrece de forma nativa el operador booleano ILIKE.
SQL Server: El operador LIKE es por defecto sensible o insensible según la configuración de la base de datos (collation), requiriendo a veces definir explícitamente un cotejamiento específico en la consulta.

- Concatenación de cadenas (|| vs. CONCAT() / +)
Definición y uso: Operaciones para unir dos o más cadenas de texto en un solo resultado.

Diferencia de sintaxis:
PostgreSQL: Utiliza el operador estándar de concatenación || o la función CONCAT().
SQL Server: Utiliza el operador aritmético + entre cadenas o la función CONCAT() (la cual maneja automáticamente valores nulos convirtiéndolos en cadenas vacías).

- Fechas y hora actual (NOW() vs. GETDATE())
Definición y uso: Funciones del sistema diseñadas para recuperar la marca de tiempo (fecha y hora exacta) del servidor en el momento de la ejecución.

Diferencia de sintaxis:
PostgreSQL: Utiliza NOW() o CURRENT_TIMESTAMP.
SQL Server: Utiliza GETDATE() o CURRENT_TIMESTAMP.

Fuente: Elmasri, R., & Navathe, S. B. (2007). Fundamentos de sistemas de bases de datos (5.ª ed.). Pearson Educación.

## Autoinvestigación avanzada:

1. CTE y CTE recursivas.

- CTE
Es un conjunto de resultados temporales con nombre, definido dentro del ámbito de ejecución de una única sentencia SELECT, INSERT, UPDATE o DELETE. Funciona como una tabla o vista temporal local que facilita la modularización y la legibilidad de consultas complejas al evitar subconsultas anidadas excesivas.

- CTE recursiva
Es una variante especial de una CTE en la que la expresión hace referencia a su propio nombre. Está compuesta por dos partes principales unidas por un operador de conjuntos (UNION o UNION ALL):

Un miembro de anclaje (anchor member), que es la consulta base que devuelve el conjunto inicial de filas.
Un miembro recursivo (recursive member), que hace referencia a la CTE y se ejecuta de manera iterativa sobre el resultado de la iteración anterior, deteniéndose automáticamente cuando no se devuelven más filas.

2. Funciones de ventana: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM() OVER (PARTITION BY … ORDER BY …).

ROW_NUMBER(): Asigna un número secuencial único a cada fila dentro de una partición, comenzando en 1, basándose en el orden especificado.
RANK(): Calcula el rango de cada fila dentro de una partición. Las filas con valores iguales reciben el mismo rango, y el siguiente rango deja un salto (hueco) en la secuencia.
DENSE_RANK(): Calcula el rango de cada fila dentro de una partición de manera similar a RANK(), pero sin dejar huecos en la secuencia numérica tras un empate.
LAG(): Permite acceder a los datos de una fila anterior ubicada a una distancia o desfase (offset) específico respecto a la fila actual dentro de la misma partición, útil para calcular diferencias iterativas.
LEAD(): Permite acceder a los datos de una fila posterior ubicada a una distancia específica respecto a la fila actual dentro de la misma partición.
SUM(...): Aplica la operación matemática de suma sobre la columna especificada.
PARTITION BY divide el conjunto de resultados en particiones o grupos independientes sobre los cuales se aplica la función.
ORDER BY dentro de la ventana establece el orden lógico de las filas dentro de cada partición, permitiendo calcular sumas acumuladas y acumulados móviles según el marco de filas evaluado.


3. Índices: qué son, cuándo ayudan y cuándo perjudican. EXPLAIN ANALYZE (PG) y plan de ejecución (SQL Server).

¿Qué son?:
Un índice es una estructura de datos auxiliar y separada (típicamente implementada como un árbol B o B-Tree) que se asocia a una o más columnas de una tabla. Su propósito es permitir que el motor de la base de datos localice y acceda a filas específicas de manera directa, evitando la necesidad de escanear toda la tabla fila por fila.

¿Cuándo ayudan?:
En consultas altamente selectivas (es decir, cuando la condición WHERE recupera un porcentaje pequeño y específico de filas del total).
En operaciones de combinación de tablas (JOIN) sobre columnas clave o foráneas.
En cláusulas de ordenamiento (ORDER BY) y agrupamiento (GROUP BY) que coinciden con la estructura del índice, evitando operaciones de ordenamiento en memoria.

¿Cuándo perjudican?:
En tablas que cambian constantemente: Si una tabla recibe muchos registros nuevos, actualizaciones o eliminaciones de forma frecuente, el sistema se vuelve más lento porque cada cambio obliga a actualizar tanto la tabla como todos sus índices al mismo tiempo.
En tablas muy pequeñas, donde el costo de buscar en el árbol del índice y luego ir a buscar la fila es mayor que leer toda la tabla secuencialmente

EXPLAIN ANALYZE (PostgreSQL):
Es una instrucción de diagnóstico que ejecuta físicamente la consulta SQL y muestra el plan de ejecución real determinado por el optimizador. Proporciona métricas detalladas que incluyen los costos estimados, el tiempo real de ejecución en milisegundos (actual time), el número de filas devueltas frente a las estimadas, y los métodos de acceso utilizados.

Plan de Ejecución / Execution Plan (SQL Server):
Es la representación gráfica o en formato XML/texto de la estrategia que el optimizador de consultas de SQL Server selecciona para ejecutar una sentencia T-SQL. Puede generarse como Plan Estimado (lo que el optimizador planea hacer sin ejecutar la consulta) o Plan Real (con métricas de rendimiento posteriores a la ejecución). Permite identificar cuellos de botella de rendimiento, operadores costosos de CPU o E/S, y la ausencia o presencia de índices adecuados para la instrucción

4. Transacciones, ACID, niveles de aislamiento, BEGIN/COMMIT/ROLLBACK.

- Transacciones y Comandos de Control (BEGIN, COMMIT, ROLLBACK)

Una transacción agrupa una secuencia de operaciones de bases de datos en una única unidad lógica de trabajo que se procesa bajo el principio de "todo o nada".

BEGIN (o START TRANSACTION): Comando que marca explícitamente el inicio de un bloque de transacción.

COMMIT: Aplica y hace permanentes todos los cambios realizados durante la transacción en la base de datos.

ROLLBACK: Cancela y deshace todos los cambios efectuados durante la transacción si ocurre un fallo, restaurando los datos a su estado previo. 

- Propiedades ACID

Son las garantías estándar que aseguran la fiabilidad y el procesamiento correcto de las transacciones:

Atomicidad (Atomicity): Garantiza que todas las sentencias de la transacción se ejecuten con éxito; si una falla, ninguna se aplica (todo o nada).

Consistencia (Consistency): Asegura que la base de datos transicione de un estado válido a otro, cumpliendo siempre con las reglas de integridad y restricciones definidas.

Aislamiento (Isolation): Determina el grado en que las modificaciones concurrentes de una transacción se mantienen ocultas o separadas de otras transacciones simultáneas.

Durabilidad (Durability): Garantiza que una vez confirmada la transacción (COMMIT), los cambios persisten de forma definitiva incluso ante fallos del sistema.

- Niveles de Aislamiento

Definidos por el estándar SQL y soportados por los motores para controlar los fenómenos de concurrencia (como lecturas sucias, lecturas no repetibles y lecturas fantasma):

Read Uncommitted (Lectura no confirmada): Permite leer datos modificados por otras transacciones que aún no han sido confirmados. Es el nivel menos restrictivo.

Read Committed (Lectura confirmada): Garantiza que solo se puedan leer datos que ya han sido confirmados (COMMIT). Evita las lecturas sucias. Es el nivel por defecto en la mayoría de los motores.

Repeatable Read (Lectura repetible): Asegura que los datos leídos durante una transacción no puedan ser modificados por otras hasta que esta finalice, evitando lecturas no repetibles.

Serializable: El nivel más estricto de aislamiento; garantiza una ejecución totalmente aislada, previniendo cualquier anomalía de concurrencia o interferencia entre transacciones simultáneas.

5. Funciones y procedimientos almacenados: PL/pgSQL y T-SQL.

Funciones almacenadas: Son bloques de código reutilizables diseñados para realizar operaciones, procesar información y devolver un valor (como un resultado numérico, texto o una tabla), lo que permite llamarlas directamente dentro de una consulta SQL normal.

Procedimientos almacenados: Son bloques de código ejecutables orientados a realizar acciones o tareas en el servidor (como modificar datos, hacer múltiples operaciones o gestionar transacciones). A diferencia de las funciones, no se pueden incrustar dentro de una consulta SELECT, sino que se ejecutan de manera independiente mediante comandos específicos.

PL/pgSQL: Es el lenguaje procedural propio de PostgreSQL que permite estructurar y escribir estas funciones y procedimientos combinando sentencias SQL con lógica de programación (variables, bucles y condiciones).

T-SQL (Transact-SQL): Es la extensión de lenguaje desarrollada por Microsoft para SQL Server, utilizada para escribir consultas, programar funciones y gestionar procedimientos almacenados del lado del servidor.

6. Vistas materializadas (PG) y triggers.

Vistas materializadas (Materialized Views): Son objetos de base de datos que almacenan físicamente el resultado de una consulta compleja (a diferencia de una vista normal, que calcula los datos en tiempo real cada vez que se consulta). Esto permite acelerar significativamente el acceso a información pesada o reportes recurrentes, aunque requiere actualizarse (refresh) de forma manual o programada para reflejar los cambios recientes en las tablas base.

Triggers (Desencadenadores): Son rutinas o procedimientos almacenados que se configuran para ejecutarse de manera automática en respuesta a un evento específico en una tabla o vista, como puede ser una inserción (INSERT), actualización (UPDATE) o eliminación (DELETE). Se utilizan comúnmente para auditorías, validaciones complejas de datos o mantenimiento automático de integridad.

7. Seguridad: roles, mínimo privilegio, inyección SQL y consultas parametrizadas.

Roles: Entidades de seguridad que agrupan un conjunto de privilegios y permisos de acceso, lo que permite administrar de forma centralizada y eficiente los permisos de los usuarios en la base de datos.

Mínimo privilegio (Principle of Least Privilege): Principio de seguridad que establece que a cada usuario, proceso o aplicación se le deben otorgar únicamente los permisos estrictamente necesarios para realizar sus tareas requeridas, reduciendo riesgos ante posibles accesos no autorizados.

Inyección SQL (SQL Injection): Vulnerabilidad de seguridad que se produce cuando datos de entrada proporcionados por el usuario se concatenan directamente en una sentencia SQL sin la debida validación o filtrado, permitiendo que un atacante altere la estructura de la consulta para ejecutar comandos maliciosos o no autorizados.

Consultas parametrizadas (Parameterized Queries): Técnica de desarrollo que separa la estructura estática del código SQL de los datos dinámicos mediante el uso de parámetros o variables de sustitución, garantizando que el SGBD trate los datos estrictamente como valores y no como código ejecutable, neutralizando así la inyección SQL.




