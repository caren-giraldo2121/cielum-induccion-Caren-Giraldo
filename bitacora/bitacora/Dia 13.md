# Bitácora Día 19-10 · [Repo inicial, README y entorno.md]
**Fecha:19/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. ¿Qué es RPA? Bots atendidos vs no atendidos.

RPA (Robotic Process Automation o automatización robótica de procesos) es una tecnología que utiliza robots de software para imitar las acciones que una persona realiza en una computadora, como hacer clic, escribir datos, copiar información, completar formularios y trabajar con aplicaciones. Se utiliza para automatizar tareas repetitivas y basadas en reglas, sin necesidad de modificar las aplicaciones existentes.

Bots atendidos vs. no atendidos
- Bot atendido (attended): es un robot de software que trabaja con la supervisión de una persona. Generalmente, el usuario inicia la automatización desde su propio equipo y puede intervenir durante el proceso. Por ejemplo, un empleado activa un bot para copiar información de un sistema a otro.

- Bot no atendido o desatendido (unattended): ejecuta procesos automáticamente, sin que una persona tenga que intervenir directamente. Puede iniciarse mediante un evento, un sistema o un horario programado. Por ejemplo, un bot que procesa facturas durante la noche

Fuente: Microsoft. (s. f.). Escenarios supervisados y sin supervisar para la automatización de procesos. Microsoft Learn.

2. ¿Cuándo usar RPA y cuándo una integración por API? Riesgos del RPA (cambios de pantalla, fragilidad).

RPA: 
se recomienda cuando es necesario automatizar tareas en aplicaciones que no cuentan con una API disponible o con un conector adecuado. Funciona imitando las interacciones de una persona con la interfaz gráfica, como los clics del mouse y las entradas del teclado. Es útil para trabajar con sistemas antiguos, aplicaciones de escritorio y formularios web.

Integración por API: 
se recomienda cuando un sistema ofrece una API que permite intercambiar datos y ejecutar operaciones directamente entre aplicaciones, sin tener que simular los clics de una persona. Las API suelen ser preferibles para integrar sistemas de forma estructurada, porque permiten enviar solicitudes y recibir respuestas mediante protocolos definidos.

Riesgos del RPA: cambios de pantalla y fragilidad
El RPA puede ser frágil porque depende de los elementos de la interfaz que utiliza para localizar botones, campos y ventanas. Si una aplicación cambia su diseño, las posiciones de los controles o los elementos identificados, el robot puede dejar de funcionar correctamente. También puede fallar por ventanas emergentes, tiempos de carga, cambios de resolución o sesiones cerradas.
Para reducir estos riesgos, se recomienda identificar los elementos de la interfaz de manera confiable, validar los resultados, registrar errores y realizar pruebas después de cada cambio en la aplicación.

Fuente: Microsoft. (s. f.). Tipos de Power Automate. Microsoft Learn.

3. Herramientas: UiPath, Power Automate Desktop, Automation Anywhere, Robot Framework, Python (Playwright/Selenium, pyautogui).

3.1. UiPath
UiPath es una plataforma de automatización robótica de procesos (RPA) que permite crear robots de software para automatizar tareas repetitivas y procesos empresariales. Permite ejecutar automatizaciones atendidas y desatendidas, así como administrar y supervisar los robots.

3.2. Power Automate Desktop
Power Automate Desktop es una herramienta de Microsoft que permite crear flujos para automatizar tareas repetitivas en aplicaciones de escritorio y sitios web. Los flujos pueden realizar acciones como hacer clic, introducir datos, manipular archivos y trabajar con hojas de cálculo.

3.3. Automation Anywhere
Automation Anywhere es una plataforma de automatización empresarial que permite desarrollar y ejecutar bots de software para automatizar tareas y procesos de trabajo. Se utiliza para reducir las actividades manuales repetitivas y conectar operaciones entre diferentes aplicaciones.

3.4. Robot Framework
Robot Framework es un framework de automatización de código abierto que utiliza un enfoque basado en palabras clave. Se utiliza principalmente para automatizar pruebas de software y también puede emplearse en procesos de automatización robótica. Sus funcionalidades se pueden ampliar mediante bibliotecas y herramientas adicionales.

3.5. Python: Playwright, Selenium y PyAutoGUI
Python es un lenguaje de programación que permite desarrollar automatizaciones utilizando bibliotecas especializadas. Entre las más conocidas se encuentran las siguientes:

a. Playwright

Playwright es una herramienta de automatización de navegadores que permite controlar Chromium, Firefox y WebKit. Se utiliza para automatizar interacciones web y realizar pruebas de aplicaciones, como completar formularios, navegar entre páginas y comprobar resultados.

b. Selenium

Selenium es un conjunto de herramientas de código abierto para automatizar navegadores web. Permite simular acciones de un usuario, como hacer clic en botones, escribir en campos, navegar por páginas y ejecutar pruebas automatizadas.

c. PyAutoGUI

PyAutoGUI es una biblioteca de Python para controlar el mouse y el teclado, realizar clics, escribir texto y tomar capturas de pantalla. Se utiliza para automatizar tareas que requieren interactuar directamente con la interfaz gráfica del computador.

Fuente: Automation Anywhere. (s. f.). Automation Anywhere. https://www.automationanywhere.com/
Microsoft. (s. f.). Introducción a flujos de escritorio. Microsoft Learn. https://learn.microsoft.com/es-es/power-automate/desktop-flows/introduction
PyAutoGUI. (s. f.). PyAutoGUI documentation. Read the Docs. https://pyautogui.readthedocs.io/en/latest/

4. ¿Qué es n8n? Nodos, triggers, ejecuciones, credenciales.

n8n es una herramienta de automatización de flujos de trabajo que permite conectar aplicaciones y servicios para intercambiar información y ejecutar tareas automáticamente, con poca o ninguna programación. Los flujos se construyen mediante nodos que se conectan entre sí para realizar distintas acciones.

- Nodos (Nodes)

Son los componentes individuales que forman un flujo de trabajo. Cada nodo puede iniciar una automatización, obtener o enviar información, procesar datos o conectarse con servicios externos. Por ejemplo, un nodo puede recibir datos de un formulario y otro enviar un correo electrónico. 

- Triggers (desencadenadores)

Son nodos especiales que inician un flujo de trabajo cuando ocurre una condición o evento determinado. Pueden activarse mediante una solicitud webhook, un horario programado o un evento de otra aplicación. 

- Ejecuciones (Executions)

Una ejecución es una instancia en la que un flujo de trabajo se ejecuta. Puede iniciarse manualmente durante las pruebas o automáticamente cuando se activa el desencadenador de un flujo publicado. Las ejecuciones permiten revisar los resultados y detectar errores. 

- Credenciales (Credentials)

Son los datos de autenticación que permiten conectar n8n con aplicaciones y servicios externos. Pueden incluir claves de API, usuarios y contraseñas o información de autenticación OAuth. n8n almacena las credenciales cifradas para proteger esta información.

Fuente: n8n. (s. f.). n8n documentation. https://docs.n8n.io/

5. Webhooks: qué son y cómo funcionan.

Un webhook es un mecanismo que permite que una aplicación envíe información automáticamente a otra cuando ocurre un evento específico. Funciona mediante solicitudes HTTP dirigidas a una URL configurada para recibir los datos. Se utiliza para conectar aplicaciones y ejecutar acciones sin necesidad de consultar constantemente si hay información nueva.

¿Cómo funcionan los webhooks?
1. Ocurre un evento: una persona completa un formulario, se registra una compra o se actualiza un dato.
2. Se envía la información: la aplicación que detecta el evento realiza una solicitud HTTP a la URL del webhook, normalmente mediante el método POST.
3. Se reciben los datos: la aplicación receptora obtiene la información enviada, que puede estar en formato JSON.
4. Se ejecuta una acción: el sistema procesa los datos y puede guardar información, enviar un correo o iniciar un flujo de automatización.

Ejemplo de un webhook en n8n
Si una persona completa un formulario, el nodo Webhook de n8n recibe los datos y activa un flujo de trabajo. A continuación, otros nodos pueden guardar la información en una base de datos y enviar un correo de confirmación.

Fuente: n8n. (s. f.). Webhook node. n8n Docs. https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
Ciutacu, L. (2022, 14 de junio). The beginner's guide to webhooks for workflow automation. n8n Blog. https://blog.n8n.io/webhooks-for-workflow-automation/

## Autoinvestigación avanzada

1. n8n: expresiones, nodo Code, IF/Switch, Merge, Loop, manejo de errores y Error Workflow

1.1. Expresiones (Expressions)
Las expresiones permiten introducir valores dinámicos en los parámetros de los nodos de n8n. Se utilizan para acceder a datos producidos por otros nodos y utilizarlos en diferentes partes del flujo de trabajo. Por ejemplo, permiten recuperar el nombre de una persona desde los datos de un formulario o utilizar el resultado de un nodo anterior. n8n utiliza expresiones con la sintaxis {{ ... }}.

1.2. Nodo Code
El nodo Code permite ejecutar código JavaScript o Python, según las opciones disponibles en la instalación de n8n, para transformar datos o realizar operaciones que no se pueden resolver fácilmente con los nodos estándar. Se puede utilizar para modificar estructuras de datos, calcular valores y preparar información para los siguientes pasos del flujo.

1.3. Nodo IF
El nodo IF permite dividir un flujo de trabajo en dos rutas según se cumpla o no una condición. La información continúa por la salida correspondiente a verdadero (true) o falso (false).
Por ejemplo, si se recibe una solicitud de compra, el nodo IF puede comprobar si el importe supera un valor determinado y dirigir la información por una ruta diferente según el resultado.

1.4. Nodo Switch
El nodo Switch permite dirigir los datos por diferentes rutas según las condiciones definidas. Es útil cuando existen más de dos posibilidades, como clasificar una solicitud en los estados «Pendiente», «Aprobada» o «Rechazada».

1.5. Nodo Merge
El nodo Merge permite combinar datos procedentes de diferentes entradas o rutas de un flujo de trabajo. Según el modo configurado, puede combinar información por posición, por campos coincidentes o de otras maneras admitidas por el nodo.
Por ejemplo, puede combinar los datos de un cliente con los de su pedido para preparar un único conjunto de información.

1.6. Nodo Loop
La iteración permite procesar una colección de elementos repetidamente, en lugar de realizar manualmente la misma operación para cada elemento. En n8n, el nodo Loop Over Items permite recorrer los elementos por lotes y ejecutar acciones sobre ellos.
Por ejemplo, permite procesar una lista de clientes y enviar un mensaje individual a cada uno. Para operaciones que los nodos ya realizan automáticamente sobre todos los elementos de entrada, puede no ser necesario crear un bucle explícito.

1.7. Manejo de errores
El manejo de errores consiste en definir cómo debe responder un flujo cuando una operación falla. En n8n se pueden configurar opciones de error en los nodos y utilizar rutas específicas para controlar fallos, registrar información o continuar el proceso cuando corresponda.
Esto permite identificar qué operación falló, revisar el mensaje de error y evitar que un problema quede sin gestionar.

1.8. Error Workflow
Un Error Workflow es un flujo de trabajo destinado a gestionar errores producidos en otros flujos de n8n. Se configura utilizando el nodo Error Trigger como punto de inicio y asociando el flujo de errores al flujo principal.
Puede utilizarse para registrar los errores, enviar notificaciones por correo electrónico o avisar al equipo responsable de una automatización que ha fallado.


2. n8n self-hosted en Docker, persistencia y variables de entorno

2.1. n8n self-hosted en Docker
El alojamiento propio (self-hosted) consiste en instalar y ejecutar n8n en una infraestructura administrada por el usuario o la organización, en lugar de utilizar el servicio alojado de n8n. Docker permite ejecutar n8n dentro de un contenedor, utilizando una imagen que incluye los componentes necesarios para ejecutar la aplicación.
Esta modalidad permite controlar la configuración, los datos almacenados y el entorno de ejecución. Sin embargo, el usuario también debe encargarse de aspectos como las actualizaciones, la seguridad, las copias de respaldo y la disponibilidad del servicio.

2.2. Persistencia de datos
La persistencia permite conservar información aunque el contenedor se detenga, se elimine o se vuelva a crear. En Docker, esto se puede conseguir mediante volúmenes que almacenan los datos fuera de la capa temporal del contenedor.
En una instalación habitual de n8n, el directorio /home/node/.n8n contiene datos importantes, como la configuración y, cuando se utiliza SQLite, la base de datos. Montar un volumen persistente en esa ubicación ayuda a conservar la información entre reinicios.
También es posible configurar n8n para utilizar PostgreSQL como base de datos. En ese caso, se debe garantizar la persistencia de PostgreSQL y realizar copias de seguridad adecuadas.

2.3. Variables de entorno
Las variables de entorno permiten configurar el comportamiento de n8n sin tener que modificar directamente su código. Se utilizan para establecer parámetros como el puerto, el tipo de base de datos, la zona horaria y las opciones de seguridad.


3. Buenas prácticas: idempotencia, reintentos, logs y protección de credenciales

3.1. Idempotencia
La idempotencia consiste en diseñar una operación para que ejecutarla varias veces con la misma solicitud no produzca efectos adicionales después de la primera ejecución exitosa.
En una automatización, esta práctica ayuda a evitar duplicados cuando un webhook envía varias veces el mismo evento o cuando un flujo se vuelve a ejecutar después de un fallo.
Por ejemplo, si un sistema recibe dos veces la misma solicitud de creación de pedido, debe comprobar si ya fue procesada antes de crear otro pedido. Esto puede implementarse utilizando un identificador único del evento, restricciones de unicidad en la base de datos o registros de procesamiento.

3.2. Reintentos (Retries)
Los reintentos consisten en volver a ejecutar una operación cuando falla por un problema que podría ser temporal, como una interrupción de red o una indisponibilidad momentánea de un servicio.
En n8n, se pueden configurar opciones de reintento en los nodos que las ofrecen. Es recomendable establecer un número limitado de intentos y un intervalo apropiado. Los reintentos deben utilizarse con cuidado cuando una operación puede crear registros, enviar pagos o producir otros efectos que no se deben duplicar.

3.3. Logs y registros de ejecución
Los registros permiten revisar las ejecuciones, identificar errores y analizar el comportamiento de una automatización. En n8n, el historial de ejecuciones ayuda a consultar los resultados de los flujos y a investigar fallos.
Las buenas prácticas incluyen registrar información útil para el diagnóstico, como la fecha, el identificador de ejecución, el paso que falló y el mensaje de error. También se debe controlar cuánto tiempo se conservan los registros y evitar almacenar innecesariamente datos personales o información confidencial.

3.4. No exponer credenciales
Las credenciales incluyen contraseñas, claves de API, tokens de acceso y otros datos utilizados para autenticar una conexión. Deben almacenarse mediante los mecanismos de credenciales de la herramienta o mediante sistemas seguros de gestión de secretos.
No deben incluirse directamente en el código, en archivos compartidos, en capturas de pantalla ni en registros que puedan consultar personas no autorizadas. También se recomienda restringir los permisos, proteger las variables de entorno sensibles y utilizar conexiones cifradas cuando corresponda.


4. RPA con Playwright: selectores robustos, esperas y capturas en error

4.1. Selectores robustos
Los selectores permiten localizar elementos de una página web para interactuar con ellos. Playwright recomienda utilizar localizadores basados en atributos accesibles y elementos reconocibles por el usuario, como el rol, el texto visible o la etiqueta de un campo.

Algunos métodos recomendados son:
- get_by_role(): localiza elementos según su función, como botones o enlaces.
- get_by_text(): localiza elementos por su texto visible.
- get_by_label(): localiza campos mediante sus etiquetas.
- get_by_placeholder(): localiza campos utilizando el texto de ejemplo.
- get_by_test_id(): localiza elementos mediante identificadores definidos para pruebas.

4.2. Esperas (Waits)
Las esperas permiten que la automatización espere hasta que un elemento esté disponible y pueda utilizarse. Playwright incorpora esperas automáticas (auto-waiting) que comprueban determinadas condiciones antes de realizar acciones como hacer clic.
Por ejemplo, antes de hacer clic en un botón, Playwright comprueba que el elemento sea visible, esté estable, habilitado y pueda recibir eventos. Si no se cumplen las condiciones dentro del tiempo límite, la operación puede producir un error de tiempo de espera (TimeoutError).

4.3. Capturas de pantalla en caso de error
Las capturas de pantalla permiten conservar una imagen de la página durante una ejecución y ayudan a investigar problemas, como elementos que no aparecen, formularios que no se completan o páginas que no cargan correctamente.
Playwright permite capturar la página completa mediante page.screenshot() y guardar la imagen en un archivo utilizando el parámetro path. También permite capturar elementos específicos mediante los métodos de los localizadores.

