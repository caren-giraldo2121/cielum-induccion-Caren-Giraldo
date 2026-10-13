# Bitácora Día 13-10 · [Repo inicial, README y entorno.md]
**Fecha:13/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. Contenedor vs máquina virtual.

Contenedor: es una unidad de software que ejecuta una aplicación en un entorno aislado. Comparte el kernel del sistema operativo del host con otros contenedores, por lo que normalmente requiere menos recursos.

Máquina virtual: es un entorno virtual que ejecuta su propio sistema operativo invitado sobre hardware virtualizado mediante un hipervisor. Esto permite tener sistemas operativos independientes en una misma máquina física.

La principal diferencia es que los contenedores comparten el kernel del host, mientras que las máquinas virtuales incluyen un sistema operativo propio. Por ello, los contenedores suelen ser más ligeros y rápidos de iniciar. 

Fuente: Docker, Inc. (s. f.). What is a container? Docker Docs. https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/

2. Imagen, contenedor, capa y registro (Docker Hub)

magen: es un paquete estandarizado que contiene los archivos, bibliotecas, dependencias y configuraciones necesarias para ejecutar una aplicación. Se utiliza como base para crear contenedores.

Contenedor: es una instancia ejecutable y aislada de una imagen, con su propio sistema de archivos, red y procesos.

Capa (layer): es una parte de una imagen que representa cambios en el sistema de archivos. Las imágenes se componen de capas que pueden compartirse para aprovechar mejor el almacenamiento.

Registro (registry): es un servicio que almacena y distribuye imágenes de contenedores.

Docker Hub: es el registro de imágenes de Docker que permite buscar, descargar y compartir imágenes públicas y privadas.

Fuente:  Docker, Inc. (s. f.). What is an image? Docker Docs. https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/

3. Comandos principales de Docker

Los comandos de Docker permiten crear, ejecutar, consultar, detener y eliminar contenedores e imágenes.

Comando                       	Función
docker run	        Crea y ejecuta un contenedor a partir de una imagen.
docker ps	        Muestra los contenedores en ejecución.
docker logs	        Muestra los registros de salida de un contenedor.
docker exec	        Ejecuta un comando dentro de un contenedor en ejecución.
docker stop	        Detiene un contenedor.
docker rm	        Elimina un contenedor.
docker images	    Lista las imágenes almacenadas localmente.
docker rmi	        Elimina una o varias imágenes.
docker pull      	Descarga una imagen desde un registro, como Docker Hub.
docker build	    Construye una imagen a partir de un Dockerfile y el contexto de construcción.

Fuente: Docker, Inc. (s. f.). Docker CLI reference. Docker Docs. https://docs.docker.com/reference/cli/docker/

4. Puertos, variables de entorno y volúmenes

Puertos: permiten comunicar un servicio que se ejecuta dentro de un contenedor con el exterior. 

Variables de entorno: permiten configurar una aplicación mediante valores como el puerto, el entorno de ejecución o la configuración de conexión a una base de datos. Se pueden establecer con -e o --env-file.

Volúmenes: permiten conservar datos fuera del ciclo de vida del contenedor y compartirlos entre contenedores cuando sea necesario. Son especialmente útiles para almacenar información persistente, como los datos de una base de datos.

Fuente: Docker, Inc. (s. f.). Running containers. Docker Docs. https://docs.docker.com/engine/containers/run/

5. ¿Qué es Docker Compose?

Docker Compose es una herramienta que permite definir y ejecutar aplicaciones que utilizan varios contenedores. Mediante un archivo YAML, normalmente llamado compose.yaml, se pueden configurar los servicios, las redes y los volúmenes de una aplicación.
Con un solo comando, como docker compose up, se pueden crear e iniciar los servicios definidos en el archivo. También permite detenerlos, consultar sus registros y administrar su funcionamiento.

Fuente: Docker, Inc. (s. f.). Docker Compose. Docker Docs. https://docs.docker.com/compose/


## Autoinvestigación avanzada: 

1. Dockerfile: FROM, WORKDIR, COPY, RUN, CMD vs ENTRYPOINT, EXPOSE, ENV, ARG.

Dockerfile es un archivo de texto que contiene instrucciones para construir una imagen de Docker. Cada instrucción indica cómo configurar el entorno, copiar archivos, ejecutar comandos o definir el comportamiento del contenedor.

FROM	    Especifica la imagen base desde la cual se construye la imagen.

WORKDIR     Establece el directorio de trabajo para las instrucciones posteriores.

COPY	    Copia archivos o directorios al sistema de archivos de la imagen.

RUN	        Ejecuta comandos durante la construcción de la imagen, por ejemplo, instalar dependencias.

CMD 	    Define el comando predeterminado que se ejecuta al iniciar el contenedor.

ENTRYPOINT	Configura el ejecutable principal del contenedor.

EXPOSE	    Documenta el puerto en el que la aplicación espera recibir conexiones; no publica el puerto por sí solo.

ENV	Define  variables de entorno que permanecen disponibles en la imagen y en los contenedores creados a partir de ella.

ARG	Define  variables disponibles durante la construcción de la imagen.

Diferencia entre CMD y ENTRYPOINT
CMD: establece el comando o los argumentos predeterminados. Se pueden sustituir al indicar otro comando al ejecutar el contenedor.
ENTRYPOINT: define el ejecutable principal que se desea iniciar. Los argumentos proporcionados al ejecutar el contenedor normalmente se agregan a ese ejecutable.

2. Caché de capas y orden de instrucciones; .dockerignore.

Caché de capas: Docker puede reutilizar los resultados de instrucciones anteriores cuando estas y sus entradas no han cambiado. Esto permite acelerar las construcciones posteriores de una imagen.

Orden de instrucciones: es recomendable copiar primero los archivos que cambian con menos frecuencia, como package.json y package-lock.json, instalar las dependencias y copiar después el código fuente. De esta manera, los cambios frecuentes en el código no obligan a repetir la instalación de dependencias si su configuración sigue igual.

.dockerignore: es un archivo que permite excluir archivos y directorios del contexto de construcción. Así se evita enviar contenido innecesario al constructor de Docker, como node_modules, archivos temporales o archivos de configuración local.

3. Builds multi-stage.

Los builds multi-stage permiten utilizar varias etapas dentro de un mismo Dockerfile. Cada etapa puede tener una función diferente, por ejemplo, instalar dependencias, compilar la aplicación y preparar la imagen final para ejecutarla.
La ventaja es que se pueden copiar únicamente los archivos necesarios desde la etapa de construcción a la etapa final, reduciendo el tamaño de la imagen y evitando incluir herramientas de compilación que no se necesitan al ejecutar la aplicación.

4. Redes en Docker y comunicación entre servicios por nombre.

Las redes de Docker permiten que los contenedores se comuniquen entre sí y, según la configuración, con el exterior. Docker Compose crea por defecto una red para los servicios de una aplicación.
Los contenedores conectados a esa red pueden localizarse mediante el nombre del servicio, gracias al sistema DNS interno de Docker. Esto evita tener que configurar manualmente las direcciones IP, que pueden cambiar cuando se recrean los contenedores.

5. healthcheck y depends_on con condición

healthcheck: permite comprobar si un contenedor está funcionando correctamente mediante una instrucción de verificación que se ejecuta periódicamente. Por ejemplo, puede comprobar si una base de datos está preparada para aceptar conexiones.

depends_on: permite establecer el orden en que Docker Compose inicia y detiene los servicios. Sin embargo, por sí solo, no garantiza que una base de datos esté lista para recibir conexiones.

Cuando se utiliza depends_on con la condición service_healthy, Compose espera a que la verificación de salud del servicio dependiente sea satisfactoria antes de iniciar el servicio que lo necesita.

6. Seguridad: no correr como root, no meter secretos en la imagen, imágenes pequeñas (alpine/slim).

No ejecutar como root: se recomienda ejecutar la aplicación con un usuario sin privilegios administrativos cuando sea posible. La instrucción USER permite establecer el usuario predeterminado para las instrucciones posteriores y para el proceso principal del contenedor.

No incluir secretos en la imagen: no se deben incorporar contraseñas, tokens ni claves privadas directamente en el Dockerfile o en la imagen. Para secretos que se necesitan durante la construcción, Docker proporciona mecanismos como los montajes de secretos de BuildKit.

Utilizar imágenes pequeñas: elegir una imagen base que contenga solo los componentes necesarios puede reducir el tamaño de la imagen y su superficie de ataque. Las variantes alpine y slim pueden ayudar, aunque es importante comprobar su compatibilidad con la aplicación.