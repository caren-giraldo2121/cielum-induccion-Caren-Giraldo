# Configuración de Zoho CRM – Proyecto Cielum (parte 6)

Este documento registra cómo quedó configurada la cuenta de prueba de Zoho CRM: leads, campo personalizado, vista, workflow, Self Client y la función Deluge.

> Las capturas van en la carpeta `capturas/`. Donde dice **📸** hay que pegar la imagen con el nombre indicado.

---

## 1. Cuenta de prueba (básico)

- Cuenta creada en [zoho.com/crm](https://www.zoho.com/crm/) con la edición de prueba gratuita.
- Centro de datos: **US** (`accounts.zoho.com` / `www.zohoapis.com`).
- Organización: *Cielum Pruebas*.

📸 `capturas/01-cuenta.png`: pantalla de inicio del CRM con el nombre de la organización.

![Cuenta](capturas/01-cuenta.png)

---

## 2. Leads ficticios (básico)

### 2.1 Creados a mano

Se crearon leads desde **Leads → Crear lead** con nombre, empresa, correo, teléfono, ciudad y **Origen Cielum**.

📸 `capturas/02-lead-manual.png`: formulario de un lead creado a mano.

![Lead manual](capturas/02-lead-manual.png)

### 2.2 Importados por CSV

Archivo: [`leads-importacion.csv`](leads-importacion.csv) (10 leads ficticios con correos `@ejemplo.com`).

Pasos: **Leads → ⋯ → Importar leads → Desde archivo** → subir el CSV → revisar el mapeo de columnas:

| Columna del CSV | Campo de Zoho |
|---|---|
| First Name | Nombre |
| Last Name | Apellidos |
| Company | Empresa |
| Email | Correo electrónico |
| Phone | Teléfono |
| City | Ciudad |
| Lead Source | Fuente de Lead |
| Origen Cielum | Origen Cielum (campo personalizado) |

> Crea primero el campo **Origen Cielum** (sección 3) para que la última columna se pueda mapear.

📸 `capturas/03-importacion-mapeo.png`: pantalla de mapeo de columnas.
📸 `capturas/04-leads-importados.png`: listado con los 10 leads.

![Mapeo](capturas/03-importacion-mapeo.png)
![Leads importados](capturas/04-leads-importados.png)

---

## 3. Campo personalizado "Origen Cielum" (intermedio)

**Configuración → Personalización → Módulos y campos → Leads → Diseño estándar** → arrastrar un campo **Lista de selección**.

| Propiedad | Valor |
|---|---|
| Etiqueta | Origen Cielum |
| Tipo | Lista de selección |
| Opciones | Web, Referido, Evento |
| Nombre de API | `Origen_Cielum` |

El nombre de API se ve en **Módulos y campos → Leads → Campos**. Es el que usan la API y Postman.

📸 `capturas/05-campo-origen.png`: configuración del campo con sus 3 opciones.

![Campo Origen Cielum](capturas/05-campo-origen.png)

---

## 4. Vista filtrada (intermedio)

**Leads → menú de vistas → Crear vista**.

| Propiedad | Valor |
|---|---|
| Nombre | Leads desde Web |
| Criterio | Origen Cielum **es** Web |
| Columnas | Nombre, Empresa, Correo, Ciudad, Origen Cielum, Hora de creación |

📸 `capturas/06-vista-config.png`: criterio de la vista.
📸 `capturas/07-vista-resultado.png`: vista mostrando solo leads con origen Web.

![Vista config](capturas/06-vista-config.png)
![Vista resultado](capturas/07-vista-resultado.png)

---

## 5. Workflow: tarea al crear lead con origen Web (intermedio)

**Configuración → Automatización → Reglas de flujo de trabajo → Crear regla**.

| Propiedad | Valor |
|---|---|
| Módulo | Leads |
| Nombre | Tarea para leads Web |
| Cuándo | Al crear un registro |
| Condición | Origen Cielum **es** Web |
| Acción instantánea | **Tarea** |

Configuración de la tarea:

| Campo | Valor |
|---|---|
| Asunto | Contactar lead que llegó por la web |
| Vence | 1 día después de la fecha de activación de la regla |
| Prioridad | Alta |
| Asignada a | Propietario del registro |

**Prueba:** se creó un lead con origen *Web* y apareció la tarea en **Actividades → Tareas** y en la ficha del lead. Al crear uno con origen *Referido*, no se generó tarea.

📸 `capturas/08-workflow-regla.png`: regla con condición y acción.
📸 `capturas/09-workflow-tarea.png`: tarea creada automáticamente en el lead.

![Workflow](capturas/08-workflow-regla.png)
![Tarea creada](capturas/09-workflow-tarea.png)

---

## 6. API: Self Client y tokens (avanzado)

### 6.1 Crear el Self Client

1. Ir a [api-console.zoho.com](https://api-console.zoho.com/) → **Add Client → Self Client → Create**.
2. Copiar **Client ID** y **Client Secret** (pestaña *Client Secret*).

📸 `capturas/10-self-client.png`: Self Client creado (**tapa el Client Secret** antes de la captura).

### 6.2 Generar el grant code

En el Self Client → pestaña **Generate Code**:

| Campo | Valor |
|---|---|
| Scope | `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ` |
| Time Duration | 10 minutes |
| Description | Postman Cielum |

El código dura pocos minutos y **solo sirve una vez**.

### 6.3 Cambiar el grant code por tokens (Postman)

1. Importar en Postman `postman/zoho-crm.postman_collection.json` y `postman/zoho-crm.postman_environment.json`.
2. Seleccionar el entorno **zoho-crm** y llenar en *Current value*: `client_id`, `client_secret` y `grant_code`.
3. Ejecutar **OAuth → 1. Generar tokens (grant code)**. El script guarda `access_token`, `refresh_token`, `api_domain` y la hora de vencimiento.

| Token | Duración | Uso |
|---|---|---|
| access_token | 1 hora | Va en cada petición: `Authorization: Zoho-oauthtoken <token>` |
| refresh_token | No vence (hasta revocarlo) | Pide un access_token nuevo sin volver a generar código |

### 6.4 Renovación automática

La colección tiene un **script de pre-request** que, antes de cada petición:

1. Revisa si el `access_token` falta o vence en menos de 1 minuto.
2. Si es así, llama a `/oauth/v2/token` con `grant_type=refresh_token`.
3. Guarda el token nuevo y su vencimiento, y continúa con la petición original.

Por eso se puede trabajar horas sin regenerar nada a mano.

### 6.5 Peticiones de la colección

| Petición | Método y ruta | Resultado |
|---|---|---|
| Crear lead | `POST /crm/v8/Leads` | Crea el lead (origen Web) y guarda `lead_id`. |
| Consultar lead por id | `GET /crm/v8/Leads/{{lead_id}}` | Trae el lead creado. |
| Listar leads | `GET /crm/v8/Leads?fields=...` | Lista con los campos pedidos. |
| Actualizar lead | `PUT /crm/v8/Leads/{{lead_id}}` | Cambia teléfono, ciudad y origen. |
| Buscar por email | `GET /crm/v8/Leads/search?email=...` | Encuentra el lead por correo. |
| Buscar por Origen Cielum | `GET /crm/v8/Leads/search?criteria=(Origen_Cielum:equals:Web)` | Filtra por el campo personalizado. |

📸 `capturas/11-postman-crear.png`: respuesta 201 al crear el lead.
📸 `capturas/12-postman-buscar.png`: respuesta de la búsqueda.

> **Seguridad:** la colección y el entorno del repo **no tienen tokens reales**. Los valores se ponen solo en *Current value* de Postman, que no se exporta. Nunca subas un entorno exportado con valores.

---

## 7. Función Deluge (reto)

Al **crear un Deal**, una función copia el nombre y el monto del Deal a los campos *Último Deal* y *Monto último Deal* del Contact asociado.

- Código: [`deluge/actualizar_contacto_desde_deal.dg`](deluge/actualizar_contacto_desde_deal.dg)
- Documentación, instalación y pruebas: [`deluge/README.md`](deluge/README.md)

📸 `capturas/13-deluge-funcion.png`: editor de la función con el código.
📸 `capturas/14-deluge-resultado.png`: Contact con los campos llenos después de crear el Deal.

---

## Estructura de la carpeta

```
zoho/
├── configuracion.md                  ← este documento
├── leads-importacion.csv             ← 10 leads ficticios
├── capturas/                         ← imágenes de la configuración
├── postman/
│   ├── zoho-crm.postman_collection.json
│   └── zoho-crm.postman_environment.json   (plantilla sin tokens)
└── deluge/
    ├── actualizar_contacto_desde_deal.dg
    └── README.md
```
