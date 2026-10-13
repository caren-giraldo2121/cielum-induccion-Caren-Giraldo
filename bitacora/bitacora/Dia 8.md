# Bitácora Día 08-10 · [Repo inicial, README y entorno.md]
**Fecha:08/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. Anatomía de una petición HTTP: método, URL, headers, query params, body.

Una petición HTTP es un mensaje que un cliente, como un navegador, Thunder Client o una aplicación, envía a un servidor para solicitar información o realizar una operación.

- Método HTTP
Indica qué operación quiere realizar el cliente sobre un recurso. Los métodos más utilizados son: 
GitHub

GET: consultar información.

POST: crear o enviar información.

PUT: reemplazar o actualizar un recurso.

PATCH: actualizar parcialmente un recurso.

DELETE: eliminar un recurso.

- URL
Es la dirección del recurso al que se dirige la petición. Puede contener el protocolo, el dominio, el puerto, la ruta y los parámetros de consulta.

- Headers (cabeceras)
Son metadatos que proporcionan información adicional al servidor, como el formato del contenido, el tipo de respuesta aceptada o las credenciales de autenticación.

- Query params (parámetros de consulta)
Son valores que se agregan a la URL después del signo ?. Se utilizan frecuentemente para filtrar, ordenar o paginar resultados. Si hay varios parámetros, se separan con &.

- Body (cuerpo)
Es la parte que contiene los datos que el cliente envía al servidor, por ejemplo, para registrar un cliente o crear un pedido. Puede contener JSON, datos de formularios o archivos. No todas las peticiones necesitan un cuerpo.

Fuente: Mozilla. (s. f.). Mensajes HTTP. MDN Web Docs. 
https://developer.mozilla.org/es/docs/Web/HTTP/Guides/Messages

2. Colecciones, carpetas y entornos en Postman. 

Una colección
Es un conjunto de peticiones HTTP guardadas en Postman. Sirve para organizar y reutilizar solicitudes que pertenecen a una misma API o funcionalidad. Puede almacenar las peticiones, sus parámetros, cabeceras, cuerpos y configuraciones de autenticación.

Carpetas (Folders)
Las carpetas permiten agrupar peticiones dentro de una colección según su función o recurso. También se pueden crear subcarpetas para organizar mejor las solicitudes.

Entornos (Environments)
Un entorno es un conjunto de variables reutilizables que permite ejecutar las mismas peticiones con diferentes configuraciones, como desarrollo, pruebas y producción.

Fuente: Postman. (s. f.). About Postman elements. Postman Docs. 
https://learning.postman.com/docs/getting-started/basics/postman-elements

3. Variables (globales, de colección, de entorno) y su prioridad.

Variables globales (Global variables)
Son variables disponibles en distintas colecciones, peticiones y entornos del espacio de trabajo. Se utilizan cuando se necesita compartir un valor de forma general. Ejemplo: una variable llamada usuario_prueba que se usa en varias colecciones.

Variables de colección (Collection variables)
Son variables disponibles en todas las peticiones de una colección específica. Resultan útiles para guardar valores que se mantienen dentro de esa colección, independientemente del entorno seleccionado. 
Postman Docs. Ejemplo: una variable token que se utiliza en las peticiones de autenticación de una colección de API REST.

Variables de entorno (Environment variables)
Son variables asociadas a un entorno concreto, como desarrollo, pruebas o producción. Permiten cambiar la configuración sin modificar las peticiones. Solo un entorno puede estar activo a la vez. Ejemplo: baseUrl  http://localhost:3000  https://api.ejemplo.com

Prioridad de las variables
Cuando varias variables tienen el mismo nombre, Postman utiliza el valor del ámbito más específico. La prioridad, de menor a mayor, es: 
Postman Docs

Globales.
De colección.
De entorno.
De datos (data).
Locales.
Por tanto, una variable local tiene prioridad sobre una de entorno, y una de entorno tiene prioridad sobre una de colección o global.

Fuente: Postman. (s. f.). Store and reuse values using variables. Postman Docs. 
https://learning.postman.com/latest-v-12/docs/use/send-requests/variables/variables

4. Tipos de autenticación: API Key, Bearer Token, Basic, OAuth 2.0.

API Key
La autenticación mediante API Key utiliza una clave única que se envía a la API para identificar la petición o al cliente que la realiza. La clave puede enviarse en una cabecera HTTP o como parámetro de consulta en la URL, según lo que requiera la API.

Bearer Token
La autenticación mediante Bearer Token utiliza un token de acceso que se envía en la cabecera Authorization. Quien posee un token válido puede utilizarlo para acceder a los recursos permitidos por la API. Este método se utiliza, por ejemplo, con tokens JWT.

Basic Authentication
La autenticación básica utiliza un nombre de usuario y una contraseña. Estos valores se codifican en Base64 y se envían en la cabecera Authorization con el prefijo Basic. Base64 es una codificación, no un método de cifrado; por eso, debe utilizarse HTTPS para proteger las credenciales durante la transmisión.

OAuth 2.0
OAuth 2.0 es un marco de autorización que permite a una aplicación obtener acceso limitado a recursos protegidos mediante tokens de acceso. Según el flujo utilizado, la aplicación puede solicitar autorización al usuario o autenticarse como cliente. Cuando obtiene el token, lo utiliza para realizar las peticiones autorizadas.

Fuente: Postman. (s. f.). Authorization types supported by Postman. Postman Docs. 
https://learning.postman.com/docs/use/send-requests/authorization/authorization-types/

5. Alternativas: Bruno, Insomnia, Thunder Client y curl.

Bruno
Es un cliente de API de código abierto que permite crear y enviar peticiones HTTP, administrar variables y entornos, y organizar las solicitudes en colecciones. Guarda las colecciones como archivos locales de texto, lo que facilita su uso con Git y el control de versiones.

Insomnia
Es una aplicación para diseñar y probar APIs. Permite enviar peticiones HTTP, organizar solicitudes en colecciones, utilizar carpetas y entornos, y ejecutar varias peticiones en secuencia. También admite protocolos como GraphQL, gRPC y WebSockets.

Thunder Client
Es una extensión ligera de Visual Studio Code para probar APIs sin salir del editor. Permite enviar solicitudes HTTP, organizar peticiones en colecciones, configurar variables y revisar las respuestas del servidor.

curl
Es una herramienta de línea de comandos que permite transferir datos mediante diferentes protocolos, incluido HTTP. Se utiliza desde la terminal para enviar solicitudes a una API sin necesidad de abrir una interfaz gráfica.

Fuente: Bruno. (s. f.). API client. 
https://www.usebruno.com/product/api-client
curl. (s. f.). curl man page. 
https://curl.se/docs/manpage.html
Kong Inc. (s. f.). API collections in Insomnia. Insomnia Documentation. 
https://developer.konghq.com/insomnia/collections/
Thunder Client. (s. f.). Documentation. 
https://docs.thunderclient.com/

## Autoinvestigación avanzada: 

1. Scripts pre-request y post-response (tests) con pm.test y pm.expect.

Scripts pre-request: son scripts que se ejecutan antes de enviar una solicitud a la API. Permiten realizar acciones previas, como establecer variables, configurar parámetros y preparar los datos de la solicitud.

Scripts post-response (tests): son scripts que se ejecutan después de recibir la respuesta de la API y permiten realizar pruebas para comprobar si los datos y el código de estado cumplen con lo esperado.

pm.test: permite definir una prueba mediante un nombre y una función que contiene las comprobaciones que se van a realizar.

pm.expect: permite realizar comprobaciones sobre los valores de una respuesta para verificar si cumplen con las condiciones esperadas.

Fuente: Postman. (s. f.). Write pre-request scripts to add dynamic behavior in Postman. https://learning.postman.com/v11/docs/tests-and-scripts/write-scripts/pre-request-scripts

2. Guardar el token del login automáticamente en una variable.

Consiste en guardar automáticamente el token que devuelve la API después de iniciar sesión en una variable de entorno o de colección. Esto permite reutilizarlo en otras solicitudes para autenticar al usuario sin tener que copiarlo manualmente.

Fuente: Postman. (s. f.). Use variables in scripts. https://learning.postman.com/docs/tests-and-scripts/write-scripts/postman-sandbox-reference/pm-variables/

3. Collection Runner y ejecuciones con archivos de datos (CSV/JSON).

Collection Runner: es una herramienta de Postman que permite ejecutar todas las solicitudes de una colección en una secuencia, realizar pruebas automáticamente y revisar los resultados de cada ejecución.

Ejecuciones con archivos de datos (CSV/JSON): permiten ejecutar una colección utilizando datos externos almacenados en archivos CSV o JSON. De esta manera, se pueden repetir las mismas solicitudes con diferentes valores sin tener que modificarlos manualmente en cada prueba.
Por ejemplo, se puede probar el inicio de sesión con varios usuarios utilizando un archivo CSV o JSON con sus datos. Postman utiliza esos datos durante cada iteración de la colección.

Fuente: Postman. (s. f.). Test your API using the Collection Runner. https://learning.postman.com/docs/tests-and-scripts/running-collections/intro-to-collection-runs

4. Newman (ejecutar colecciones desde consola y en CI) y reportes HTML.

Newman: es una herramienta de línea de comandos que permite ejecutar colecciones de Postman desde la consola, sin necesidad de utilizar la aplicación de Postman. También permite integrar las pruebas en sistemas de integración continua (CI) para ejecutarlas automáticamente cuando se realizan cambios en el código. 

Ejecución desde consola: consiste en ejecutar una colección exportada de Postman utilizando comandos en la terminal.

Integración continua (CI): permite ejecutar automáticamente las colecciones y sus pruebas dentro de un proceso de desarrollo, para comprobar si los cambios realizados funcionan correctamente.

Reportes HTML: son informes que muestran los resultados de la ejecución de una colección en una página web, facilitando la revisión de las solicitudes y las pruebas realizadas. Para generarlos con Newman se necesita instalar un reportero HTML adicional.

Ejemplo: Postman. (s. f.). Run and test collections from the command line using Newman CLI. https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman
Newman. (s. f.). Newman. npm. https://www.npmjs.com/package/newman

5. Mock servers y documentación publicada.

Mock servers: son servidores simulados que permiten imitar el comportamiento de una API real, recibiendo solicitudes y devolviendo respuestas de ejemplo. Se utilizan para desarrollar y probar una API antes de que el servidor real esté disponible.

Documentación publicada: consiste en compartir la documentación de una API mediante un enlace para que otras personas puedan consultar información sobre sus solicitudes, endpoints, parámetros y respuestas. Esto facilita que los desarrolladores comprendan cómo utilizar la API. 

Fuente: Postman. (s. f.). Simulate your API in Postman with a mock server. https://learning.postman.com/docs/design-apis/mock-apis/overview