# Bitácora Día 08-10 · [Repo inicial, README y entorno.md]
**Fecha:08/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. ¿Qué es Node.js y en qué se diferencia de JS en el navegador?

Node.js es un entorno de ejecución de JavaScript de código abierto que permite ejecutar código JavaScript fuera del navegador, principalmente en servidores. Utiliza el motor V8 de Google Chrome para ejecutar el código.

Diferencia: En el navegador, JavaScript se utiliza para interactuar con la página web mediante el DOM y otras APIs del navegador.
En Node.js, no existen objetos como window o document; en cambio, proporciona módulos para trabajar con archivos, redes y servidores.

Fuente: Node.js. (s.f.). Introduction to Node.js. Node.js Learn. Recuperado el 8 de octubre de 2026, de https://nodejs.org/learn/getting-started/introduction-to-nodejs
MDN Web Docs. (s.f.). JavaScript language overview. Recuperado el 8 de octubre de 2026, de https://developer.mozilla.org/

2. npm, package.json, dependencias vs devDependencies, package-lock.json, scripts.

npm (Node Package Manager): es el administrador de paquetes de Node.js. Permite instalar, actualizar y gestionar librerías para un proyecto.

package.json: es el archivo que contiene la información del proyecto, como nombre, versión, dependencias y scripts. Según la documentación de npm, es el archivo principal de configuración de un proyecto.

dependencies: paquetes requeridos por la aplicación en producción.

devDependencies: paquetes necesarios solo para desarrollo y pruebas”..

package-lock.json: archivo generado automáticamente por npm que guarda las versiones exactas de las dependencias para que todos instalen las mismas versiones.

scripts: sección de package.json donde se definen comandos que pueden ejecutarse con npm run, como iniciar la aplicación o ejecutar pruebas.

Fuente: npm, Inc. (s.f.). Specifying dependencies and devDependencies in a package.json file. npm Docs. https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file

3. ¿Qué es REST? Métodos HTTP, códigos de estado (200, 201, 204, 400, 401, 403, 404, 409, 500).

REST es un estilo de arquitectura para crear APIs que utilizan HTTP para acceder y manipular recursos mediante una URL. Los recursos se gestionan usando métodos HTTP como GET, POST, PUT y DELETE.

Métodos HTTP más usados

GET: obtiene información de un recurso.
POST: crea un nuevo recurso.
PUT: actualiza un recurso existente.
DELETE: elimina un recurso.

Códigos de estado HTTP

200 OK: la solicitud fue exitosa.
201 Created: la solicitud fue exitosa y se creó un nuevo recurso.
204 No Content: la solicitud fue exitosa, pero no devuelve contenido.
400 Bad Request: la solicitud tiene errores o sintaxis inválida.
401 Unauthorized: el cliente debe autenticarse.
403 Forbidden: el cliente no tiene permisos para acceder al recurso.
404 Not Found: el recurso solicitado no existe.
409 Conflict: existe un conflicto con el estado actual del servidor.
500 Internal Server Error: ocurrió un error interno en el servidor.

Fuente: MDN Web Docs. (s.f.). HTTP request methods. Recuperado el 8 de octubre de 2026, de https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference

4. ¿Qué es Express, qué es una ruta y qué es un middleware?

Express: es un framework web para Node.js que proporciona funcionalidades para crear aplicaciones web y APIs de forma rápida y sencilla. 

Ruta (Route): una ruta define cómo responde una aplicación a una solicitud de un cliente en una URL específica y con un método HTTP determinado (GET, POST, PUT, DELETE, etc.). 

Middleware: son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función middleware. Pueden ejecutar código, modificar la solicitud o respuesta y finalizar el ciclo de petición.

Fuentes: Express.js. (s.f.). Installing Express. Recuperado el 8 de octubre de 2026, de https://expressjs.com/es/starter/installing.html

5. Variables de entorno con .env.

Las variables de entorno son valores de configuración que se almacenan fuera del código fuente, como contraseñas, claves API, puertos o cadenas de conexión. El archivo .env se utiliza para guardar estas variables y cargarlas en la aplicación durante la ejecución.

Fuentes: Node.js. (s.f.). How to read environment variables from Node.js. Recuperado el 8 de octubre de 2026, de https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs

## Autoinvestigación avanzada:

1. Arquitectura por capas: rutas → controladores → servicios → repositorios.

La arquitectura por capas separa las responsabilidades de una aplicación para mantener el código organizado.

Rutas: definen los endpoints y los métodos HTTP que recibe la aplicación.

Controladores: reciben la petición y coordinan qué acción debe ejecutarse.

Servicios: contienen la lógica de negocio de la aplicación.

Repositorios: se encargan del acceso y manejo de los datos en la base de datos.

2. Validación de entrada (zod o joi).

La validación de entrada consiste en comprobar que los datos recibidos por una aplicación cumplen con el formato y las reglas esperadas antes de utilizarlos.

Zod es una biblioteca de validación que permite definir esquemas y validar los datos recibidos. Con parse() se valida la entrada y, si no cumple el esquema, se genera un error. También existe safeParse(), que devuelve un resultado indicando si la validación fue exitosa.

3. Manejo centralizado de errores.

El manejo centralizado de errores consiste en utilizar un middleware específico para capturar y procesar los errores de la aplicación desde un solo lugar. En Express, este middleware recibe cuatro parámetros: (err, req, res, next).

4. Conexión a PostgreSQL con pg (pool, consultas parametrizadas).

pg (node-postgres) es un módulo para conectar aplicaciones Node.js con PostgreSQL.

Pool: permite reutilizar conexiones y es la forma más común de trabajar con PostgreSQL en aplicaciones que realizan muchas consultas.

Consultas parametrizadas: utilizan valores como $1, $2, etc., en lugar de concatenar directamente los datos en la consulta. Esto ayuda a evitar vulnerabilidades de inyección SQL.

5. Autenticación con JWT: qué es, cómo se firma y verifica, dónde NO guardarlo.

JWT (JSON Web Token) es un formato de token utilizado para transmitir información entre partes de forma segura. El token contiene información y una firma digital que permite comprobar que no fue alterado.

Firmar: se genera una firma utilizando una clave secreta o una clave privada. Node.js proporciona funciones criptográficas para generar firmas.

Verificar: el servidor utiliza la clave correspondiente para comprobar que la firma del token es válida y que el contenido no fue modificado.

Dónde NO guardarlo: no se debe guardar un JWT en lugares públicos del código ni incluir la clave secreta/privada dentro del código fuente o repositorio. Las claves deben manejarse como información secreta, por ejemplo mediante variables de entorno.

6. Buenas prácticas: CORS, helmet, logs, paginación.

CORS: permite controlar qué orígenes pueden acceder a los recursos de una aplicación mediante solicitudes desde otro origen. Express permite configurarlo mediante middleware.

Helmet: es un middleware para Express que ayuda a proteger la aplicación estableciendo diferentes encabezados HTTP relacionados con seguridad.

Logs: permiten registrar información sobre las solicitudes y el funcionamiento de la aplicación, lo que facilita detectar errores y revisar su comportamiento. Node.js proporciona herramientas para escribir información en la salida estándar.

Paginación: consiste en dividir grandes cantidades de resultados en páginas o grupos más pequeños, evitando devolver todos los registros en una sola respuesta. Con PostgreSQL puede realizarse mediante LIMIT y OFFSET


