# Bitácora Día 19-10 · [Repo inicial, README y entorno.md]
**Fecha:19/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. ¿Qué es un CRM y para qué lo usa una empresa?

Un CRM (Customer Relationship Management) es un sistema de gestión de relaciones con los clientes. Es un software que permite centralizar y organizar la información de clientes actuales, posibles clientes, empresas, interacciones y oportunidades de venta en un mismo lugar.

¿Para qué lo utiliza una empresa?
- Organizar clientes: guardar nombres, correos, teléfonos y otros datos.
- Gestionar ventas: hacer seguimiento de posibles clientes y oportunidades comerciales.
- Registrar interacciones: consultar llamadas, correos, reuniones y actividades anteriores.
- Mejorar la atención: facilitar que los equipos conozcan el historial de cada cliente.
- Analizar resultados: generar informes sobre ventas, clientes y desempeño comercial.

Fuente: HubSpot. (s. f.). ¿Qué es un CRM system (sistema CRM)? https://blog.hubspot.es/sales/que-es-un-crm-system-sistema-crm

2. Módulos estándar: Leads, Contacts, Accounts, Deals. Conversión de Lead.

Leads (clientes potenciales)
Son personas o empresas que han mostrado interés o que podrían convertirse en clientes, pero cuya posibilidad de compra todavía debe evaluarse.
Ejemplo: una persona que llena un formulario para solicitar información sobre un producto.

Contacts (contactos)
Son los registros de personas con las que la empresa mantiene una relación comercial. Pueden incluir nombre, teléfono, correo e historial de interacciones
Ejemplo: el empleado de una empresa que solicita una cotización.

Accounts (cuentas o empresas)
Representan las organizaciones con las que la empresa tiene o puede desarrollar una relación comercial. Una cuenta puede estar relacionada con varios contactos.
Ejemplo: una empresa que compra equipos tecnológicos.

Deals (oportunidades de venta)
Representan negocios o ventas en proceso. Permiten registrar el valor estimado, la etapa comercial, la fecha prevista de cierre y las personas o empresas relacionadas.
Ejemplo: una cotización de $5.000.000 que está pendiente de aprobación.

Conversión de un Lead
La conversión de un Lead ocurre cuando un cliente potencial ha sido calificado y se decide avanzar con él en el proceso comercial.

En Salesforce, durante la conversión se pueden crear o asociar los siguientes registros:
1. Account: la empresa a la que pertenece el cliente potencial.
2. Contact: la persona con la que se establecerá la relación comercial.
3. Deal u Opportunity: la oportunidad de venta, si corresponde.

Ejemplo: una persona solicita información, el equipo confirma que tiene interés real en comprar y convierte el Lead para gestionar su contacto y la oportunidad de venta.

Fuente: HubSpot. (s. f.). Manage your CRM database. HubSpot Knowledge Base. https://knowledge.hubspot.com/get-started/manage-your-crm-database
Salesforce. (s. f.). Considerations for converting leads. Salesforce Help. https://help.salesforce.com/s/articleView?id=leads_notes.htm&language=en_US&type=5

3. Campos personalizados, layouts, vistas y listas.

Campos personalizados	
Son campos adicionales que se crean para guardar información específica que los campos predeterminados no contemplan.

Layouts (diseños de página)
Organizan cómo se muestran los campos y las secciones de un registro y, según la configuración, cuáles son obligatorios o editables.

Vistas	
Permiten mostrar registros que cumplen determinados criterios o filtros.

Listas	
Agrupan registros para facilitar su organización, consulta y seguimiento.

Fuente: Salesforce. (s. f.). What determines field access? Salesforce Help. https://help.salesforce.com/articleView?id=customize_fieldaccess.htm
HubSpot. (s. f.). Manage your CRM database. HubSpot Knowledge Base. https://knowledge.hubspot.com/get-started/manage-your-crm-database

4. Roles, perfiles y permisos.

Los roles, perfiles y permisos se utilizan para administrar el acceso de los usuarios a la información y las funciones del CRM. Su configuración permite proteger los datos y establecer qué acciones puede realizar cada persona.

- Roles: determinan la posición del usuario dentro de la jerarquía organizacional y pueden influir en los registros a los que tiene acceso.

- Perfiles: en Salesforce, agrupan permisos básicos que determinan qué funciones puede utilizar un usuario.

- Permisos: autorizan acciones específicas, como consultar, crear, modificar o eliminar registros.

Fuente: Salesforce. (s. f.). Control access to objects. Trailhead. https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_objects

5. Importación de datos, reportes y dashboards

- Importación de datos
La importación consiste en cargar información desde archivos, como Excel o CSV, o desde otros sistemas, para crear o actualizar registros en el CRM.
Puede utilizarse para importar contactos, empresas, oportunidades de venta y otros datos admitidos por la plataforma.

Ejemplo: una empresa tiene una hoja de Excel con 500 clientes. Puede importar sus datos al CRM, relacionar los contactos con sus empresas y continuar gestionando las ventas desde una misma plataforma.

- Reportes
Los reportes permiten consultar y analizar datos del CRM para conocer los resultados de las actividades comerciales.

Algunos ejemplos son:
- Cantidad de Leads recibidos durante un mes.
- Número de oportunidades ganadas y perdidas.
- Ventas realizadas por cada vendedor.
- Valor total de las oportunidades abiertas.

- Dashboards o paneles de control
Un dashboard reúne información importante en una vista visual, normalmente mediante gráficos, indicadores y tablas. Facilita la consulta de varios resultados sin tener que revisar cada reporte por separado.

Ejemplo: un supervisor puede tener un dashboard que muestre las ventas del mes, las oportunidades abiertas y el cumplimiento de las metas comerciales.

Fuente: HubSpot. (s. f.). Understand the import tool. HubSpot Knowledge Base. https://knowledge.hubspot.com/import-and-export/understand-the-import-tool


## Autoinvestigación avanzada:

1. Workflow Rules, asignación automática y Blueprints

- Workflow Rules (reglas de flujo de trabajo)

Las reglas de flujo de trabajo permiten automatizar procesos empresariales mediante la configuración de activadores, criterios y acciones. Cuando se cumplen las condiciones establecidas y se activa la regla, Zoho CRM puede ejecutar acciones automáticamente, como actualizar campos o enviar notificaciones por correo electrónico. 

Ejemplo: cuando se registra un cliente potencial de alta prioridad, se puede configurar una regla para actualizar su estado y enviar una notificación al gerente correspondiente.

- Asignación automática (Assignment Rules)

Las reglas de asignación permiten establecer criterios para asignar registros a usuarios responsables. Se pueden configurar para clientes potenciales, contactos, acuerdos, casos y módulos personalizados.
En Zoho CRM, las reglas de asignación pueden utilizarse con registros generados mediante importaciones, formularios web y API. No se aplican cuando los registros se crean manualmente desde la interfaz.

Ejemplo: asignar automáticamente los clientes potenciales que llegan mediante un formulario al vendedor que corresponda según los criterios establecidos.

- Blueprints

Blueprint permite diseñar y aplicar un proceso de negocio mediante etapas y transiciones definidas. Su configuración comprende tres pasos principales:

1. Ingresar información básica: especificar el módulo, el diseño y el campo sobre el que se creará el proceso.
2. Definir el flujo del proceso: establecer las etapas y transiciones en el editor de Blueprint.
3. Configurar las transiciones: determinar las condiciones y acciones necesarias para avanzar en el proceso.
De esta manera, Blueprint permite estructurar los pasos que deben seguirse para completar un proceso empresarial. 

Ejemplo: diseñar un proceso comercial en el que una oportunidad debe pasar por las etapas de contacto, negociación y cierre, cumpliendo los requisitos definidos para cada transición.

2. Deluge: qué es y para qué se usa en funciones personalizadas

Deluge es el lenguaje de scripting de Zoho que permite escribir funciones personalizadas para automatizar procesos. Una función personalizada es un código de software que puede utilizarse para automatizar un proceso y que puede ejecutarse desde una o varias reglas de flujo de trabajo. 

Las funciones personalizadas permiten, entre otras cosas:
- Automatizar tareas repetitivas.
- Aplicar lógica personalizada cuando se activa una regla.
- Generar notificaciones.
- Invocar webhooks.
- Integrar aplicaciones de Zoho con aplicaciones de terceros.
Las funciones se escriben en el editor de scripts de Deluge y se pueden asociar a reglas de flujo de trabajo compatibles. 

Ejemplo: crear una función que calcule un valor a partir de los datos de un registro y actualice un campo cuando se active una automatización.

3. API REST de Zoho CRM (versión vigente en la documentación): OAuth 2.0 con Self Client, access token vs refresh token, scopes, data center (.com vs otros dominios).

API REST de Zoho CRM
La documentación consultada utiliza Zoho CRM API V8, que permite integrar aplicaciones externas con Zoho CRM mediante solicitudes HTTP.

OAuth 2.0 con Self Client
OAuth 2.0 es un protocolo de autorización que permite a las aplicaciones acceder a recursos protegidos mediante tokens. Self Client es un tipo de cliente de Zoho API Console que permite generar autorización para acceder a los datos de una cuenta de Zoho.

Access token vs. refresh token
- Access token: permite realizar solicitudes a la API y acceder a los recursos autorizados. En Zoho CRM, tiene una duración de una hora.
- Refresh token: permite obtener un nuevo access token cuando el anterior caduca, sin repetir el proceso de autorización. No se genera mediante el flujo Client Credentials.

Scopes
Los scopes son permisos que determinan el nivel de acceso de una aplicación a los recursos protegidos. Especifican qué operaciones puede realizar, como leer, crear, actualizar o eliminar registros.

Ejemplos:
- ZohoCRM.modules.READ: lectura de registros.
- ZohoCRM.modules.CREATE: creación de registros.
- ZohoCRM.modules.UPDATE: actualización de registros.
- ZohoCRM.modules.DELETE: eliminación de registros.
- ZohoCRM.coql.READ: consultas mediante COQL.

Data center (.com y otros dominios)
Zoho dispone de distintos centros de datos, cada uno con sus propios dominios para la autorización y las solicitudes a la API. Por ejemplo, Estados Unidos utiliza accounts.zoho.com, Europa utiliza accounts.zoho.eu e India utiliza accounts.zoho.in.

El dominio de la API debe corresponder al centro de datos de la cuenta. La respuesta de autorización proporciona el dominio API que debe utilizarse para realizar las solicitudes.

4. CRUD de registros por API, búsqueda y COQL.

CRUD de registros
CRUD representa las cuatro operaciones básicas para gestionar registros:
- Create (POST): crear registros.
- Read (GET): consultar registros.
- Update (PUT): actualizar registros existentes.
- Delete (DELETE): eliminar registros.
Estas operaciones permiten administrar la información de los módulos de Zoho CRM mediante solicitudes a sus endpoints REST.

Búsqueda de registros
La Search API permite buscar registros de un módulo utilizando criterios específicos, direcciones de correo electrónico, números de teléfono o palabras, según los parámetros admitidos por la API.

COQL
COQL (CRM Object Query Language) es un lenguaje de consultas de Zoho CRM con una sintaxis similar a SQL. Permite seleccionar campos, establecer condiciones, ordenar resultados, limitar la cantidad de registros y consultar información relacionada cuando la estructura lo permite.

5. Webhooks y límites de API

Webhooks
Los webhooks permiten enviar información desde Zoho CRM a aplicaciones externas cuando ocurren determinados eventos. Se utilizan para integrar sistemas, transmitir información y mantener los datos sincronizados.
Por ejemplo, cuando se actualiza un registro, un webhook configurado para ese evento puede enviar información a otro sistema para que procese los cambios.

Límites de API
Zoho CRM establece límites para controlar el uso de su API. Estos incluyen créditos de API, límites de concurrencia y restricciones específicas según la operación.

El consumo de créditos depende del tipo de solicitud y de la cantidad de registros procesados. Los límites disponibles varían según la edición contratada y el número de licencias.

Las operaciones de creación, actualización y upsert admiten hasta 100 registros por llamada. Además, las API de búsqueda y COQL tienen límites en la cantidad de resultados que pueden devolver. Para operaciones de gran volumen, Zoho dispone de alternativas como Bulk Read.




