# Bitácora Día 06-10 · [Repo inicial, README y entorno.md]
**Fecha:06/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. ¿Qué es una base de datos relacional, tabla, llave primaria y llave foránea?

Base de datos relacional: es una base de datos que organiza la información en tablas relacionadas entre sí. Estas relaciones permiten conectar los datos de diferentes tablas mediante campos en común.

Tabla: es una estructura de la base de datos que almacena información sobre un tema determinado.

Llave primaria (Primary Key): es una columna, o combinación de columnas, cuyos valores identifican de forma única cada registro de una tabla. No puede haber dos registros con el mismo valor de llave primaria.

Llave foránea (Foreign Key): es una columna, o combinación de columnas, que hace referencia a la llave primaria de otra tabla, permitiendo establecer una relación entre ambas tablas.

Fuente: Microsoft. (2025). Primary and foreign key constraints. Microsoft Learn. Microsoft Learn
Microsoft. (s. f.). Introduction to tables. Microsoft Support. Microsoft Support

2. DDL vs DML: CREATE, ALTER, DROP vs INSERT, UPDATE, DELETE, SELECT.

## DDL vs DML
DDL (Data Definition Language): es el lenguaje utilizado para definir las estructuras de datos. Se utiliza para crear, modificar o eliminar estructuras de una base de datos. Entre sus instrucciones están CREATE, ALTER y DROP.

CREATE: se utiliza para crear objetos de la base de datos., como una base de datos o una tabla.

ALTER: se utiliza para modificar la estructura de un objeto que ya existe.

DROP: se utiliza para eliminar un objeto existente de la base de datos.

## DML (Data Manipulation Language):
Es el lenguaje utilizado para trabajar con la información almacenada en la base de datos. Permite agregar, modificar, consultar o eliminar datos. Entre sus instrucciones están INSERT, UPDATE, DELETE y SELECT.

INSERT: se utiliza para agregar nuevos registros o datos a una tabla.

UPDATE: se utiliza para modificar o actualizar los datos de registros que ya existen en una tabla.

DELETE: se utiliza para eliminar uno o varios registros de una tabla.

SELECT: se utiliza para consultar y recuperar datos almacenados en una o varias tablas.

DDL trabaja con la estructura de la base de datos, mientras que DML trabaja con los datos almacenados en esas estructuras.

Fuente: Microsoft. (2026, 21 de julio). Transact-SQL declaraciones. Microsoft Learn. Microsoft Learn

3. WHERE, ORDER BY, GROUP BY, HAVING, funciones de agregación.

WHERE: se utiliza para filtrar los registros y seleccionar únicamente aquellos que cumplen una condición.

ORDER BY: se utiliza para ordenar los resultados de una consulta de forma ascendente (ASC) o descendente (DESC).

GROUP BY: se utiliza para agrupar registros que tienen los mismos valores en una o varias columnas, generalmente junto con funciones de agregación.

HAVING: se utiliza para filtrar los grupos obtenidos mediante GROUP BY según una condición.

Funciones de agregación: se utilizan para realizar cálculos sobre un conjunto de registros y devolver un único resultado. Algunas de las principales son COUNT, SUM, AVG, MIN y MAX.

COUNT: cuenta la cantidad de registros o valores.

SUM: calcula la suma de los valores de una columna.

AVG: calcula el promedio de los valores.

MIN: devuelve el valor mínimo de un conjunto de datos.

MAX: devuelve el valor máximo de un conjunto de datos.

Fuente: Microsoft. (2026, 21 de julio). Funciones de agregado (Transact-SQL). Microsoft Learn. Microsoft Learn

4. INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN.

INNER JOIN: se utiliza para devolver las filas que tienen coincidencias en ambas tablas.

LEFT JOIN: se utiliza para devolver todas las filas de la tabla izquierda y las filas coincidentes de la tabla derecha. Si no hay coincidencia, se muestran valores NULL.

RIGHT JOIN: se utiliza para devolver todas las filas de la tabla derecha y las filas coincidentes de la tabla izquierda. Si no hay coincidencia, se muestran valores NULL.

FULL JOIN: se utiliza para devolver todas las filas de ambas tablas. Cuando no existe una coincidencia, los valores de la otra tabla se muestran como NULL.

Fuente: Microsoft. (s. f.). Combinaciones (SQL Server). Microsoft Learn. Microsoft Learn

5. Tipos de datos más usados en PostgreSQL y en SQL Server y sus equivalencias.

INTEGER / INT: se utiliza para almacenar números enteros. En PostgreSQL se utiliza INTEGER y en SQL Server INT.

BIGINT: se utiliza para almacenar números enteros grandes. Está disponible en ambos sistemas.

VARCHAR(n): se utiliza para almacenar cadenas de caracteres de longitud variable. Está disponible en ambos sistemas.

CHAR(n): se utiliza para almacenar cadenas de caracteres de longitud fija. Está disponible en ambos sistemas.

TEXT: se utiliza para almacenar cadenas de texto de longitud variable. PostgreSQL utiliza TEXT; SQL Server también dispone de TEXT, aunque existen tipos como VARCHAR(MAX) para valores de gran tamaño.

DECIMAL / NUMERIC: se utilizan para almacenar números exactos con una precisión y escala determinadas. Ambos sistemas soportan DECIMAL y NUMERIC.

DATE: se utiliza para almacenar fechas, como año, mes y día. Está disponible en ambos sistemas.

TIMESTAMP / DATETIME: se utilizan para almacenar valores de fecha y hora. PostgreSQL utiliza principalmente TIMESTAMP, mientras que SQL Server dispone de DATETIME y DATETIME2.

BOOLEAN / BIT: se utilizan para representar valores lógicos de verdadero o falso. PostgreSQL utiliza BOOLEAN y SQL Server utiliza BIT.

Fuente: PostgreSQL Global Development Group. (2026). Data types. PostgreSQL Documentation. PostgreSQL Documentation
Microsoft. (s. f.). Tipos de datos (Transact-SQL). Microsoft Learn. Microsoft Learn
