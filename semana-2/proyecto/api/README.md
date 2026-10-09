# API REST con Node.js y PostgreSQL

## Descripción

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar clientes, productos y pedidos. Incluye validación de datos, autenticación mediante JWT y una arquitectura organizada por capas.

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* `pg`
* Zod
* JSON Web Token (`jsonwebtoken`)
* `bcryptjs`
* `dotenv`

## Requisitos

* Node.js instalado.
* PostgreSQL instalado y en funcionamiento.
* Una base de datos configurada para el proyecto.

## Instalación

1. Abrir una terminal en la carpeta `api`.

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` a partir de `.env.example`.

4. Configurar las variables de entorno:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
   JWT_SECRET=tu_secreto
   ```

   Reemplazar los valores de ejemplo por los datos de la configuración local.

## Ejecución

Iniciar la API con:

```bash
node server.js
```

La API estará disponible en `http://localhost:3000`, siempre que el puerto 3000 esté libre.

Para comprobar que funciona, abrir:

`http://localhost:3000/salud`

## Funcionalidades

* Consulta y gestión de clientes.
* Creación, consulta, actualización y eliminación de productos.
* Gestión de pedidos con sus respectivos detalles.
* Filtrado y paginación de pedidos.
* Validación de datos con Zod.
* Autenticación mediante JWT.
* Protección de rutas mediante middleware.
* Manejo centralizado de errores.
* Conexión a PostgreSQL mediante consultas parametrizadas.
* Uso de transacciones para operaciones relacionadas con pedidos.

## Endpoints principales

| Método | Ruta           | Función                         |
| ------ | -------------- | ------------------------------- |
| GET    | `/salud`       | Comprobar el estado de la API   |
| GET    | `/clientes`    | Consultar clientes              |
| POST   | `/clientes`    | Crear un cliente                |
| GET    | `/productos`   | Consultar productos             |
| POST   | `/productos`   | Crear un producto               |
| GET    | `/pedidos`     | Consultar pedidos               |
| POST   | `/pedidos`     | Crear un pedido                 |
| POST   | `/auth/login`  | Iniciar sesión                  |
| GET    | `/auth/perfil` | Consultar el perfil autenticado |

Las rutas protegidas requieren un token JWT válido. Los demás endpoints y métodos están definidos en los archivos de rutas correspondientes.

## Estructura del proyecto

* `controllers/`: reciben las solicitudes y gestionan las respuestas.
* `services/`: contienen la lógica de acceso y operación de los datos.
* `routes/`: definen los endpoints.
* `middlewares/`: contienen validaciones, autenticación y manejo de errores.
* `schemas/`: definen los esquemas de validación con Zod.
* `db.js`: configura la conexión a PostgreSQL.
* `server.js`: configura y ejecuta el servidor.

## Seguridad

* Las contraseñas se verifican mediante `bcryptjs`.
* Los tokens JWT tienen un tiempo de expiración de una hora.
* Las variables de entorno y los secretos reales no deben publicarse en el repositorio.
* Las consultas SQL utilizan parámetros para reducir el riesgo de inyección SQL.


## Pruebas de API con JWT en Thunder Client

Se realizaron pruebas de los endpoints del módulo de clientes utilizando Thunder Client. Se verificó el funcionamiento de las operaciones para listar, consultar, registrar, actualizar y eliminar clientes.

También se probaron los mecanismos de autenticación y validación de datos, incluyendo solicitudes sin token, tokens inválidos, búsqueda de clientes inexistentes y registro con campos obligatorios vacíos.

**Resultados obtenidos:**

* `201 Created`: registro de un cliente exitoso.
* `400 Bad Request`: rechazo de solicitudes con campos obligatorios vacíos.
* `401 Unauthorized`: rechazo de solicitudes sin token o con token inválido.
* `404 Not Found`: respuesta al consultar un cliente inexistente.

**Resultado general:** las pruebas realizadas fueron satisfactorias y permitieron comprobar el funcionamiento de las operaciones del módulo de clientes, la autenticación JWT y la validación de los datos de entrada.

