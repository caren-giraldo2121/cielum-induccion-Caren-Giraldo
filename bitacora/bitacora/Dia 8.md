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


