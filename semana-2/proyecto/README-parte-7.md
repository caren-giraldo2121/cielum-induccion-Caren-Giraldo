# Parte 7 – Automatización con n8n y RPA

Guía para ejecutar lo de hoy: **n8n en Docker**, el flujo **pedido → Zoho CRM → PostgreSQL → correo**, el **Error Workflow**, y el **bot RPA** que genera `reporte_diario.xlsx`.

> 📝 Marcado con **👩‍💻 TÚ** = lo que tienes que hacer a mano (no se puede automatizar desde el código: cuentas, credenciales, clics en la interfaz de n8n, capturas).

---

## 1. Qué se agregó al proyecto

| Archivo | Para qué |
|---|---|
| `docker-compose.yml` | Servicios nuevos **`n8n`** (puerto 5678) y **`mailpit`** (correo de pruebas, 8025). La API recibe `N8N_WEBHOOK_URL`. |
| `database.sql` | Tabla nueva **`log_integraciones`** (se crea sola en una base nueva). |
| `n8n/sql/log_integraciones.sql` | La misma tabla, para crearla a mano si tu volumen `pgdata` ya existía. |
| `api/services/n8n.service.js` | Llama al webhook de n8n cuando se crea un pedido (sin bloquear la respuesta). |
| `api/controllers/pedidos.controller.js` | Después de crear el pedido, llama a `n8nService.notificarPedidoCreado(...)`. |
| `api/.env.example` | Variables `N8N_WEBHOOK_URL` y `N8N_WEBHOOK_TOKEN` para correr la API fuera de Docker. |
| `n8n/pedido-a-zoho.json` | **Reto:** flujo completo con validación y manejo de errores. |
| `n8n/error-workflow.json` | **Avanzado:** Error Workflow que avisa por correo cuando falla un flujo. |
| `n8n/ejercicios/basico-http-a-archivo.json` | **Básico:** Manual Trigger → HTTP Request → archivo CSV. |
| `n8n/ejercicios/avanzado-flujo-que-falla.json` | Flujo que falla a propósito para probar el Error Workflow. |
| `n8n/.env.example` | Plantilla de credenciales de Zoho y correo (copiar como `n8n/.env`). |
| `rpa/` | **Reto:** bot `reporte_diario.py` + ejercicio intermedio `ejercicios/formulario_practica.py` + `README.md` con API vs RPA. |

### Cómo fluye un pedido

```
Frontend / Postman ──POST /pedidos──► API (Express)
                                        │ 201 al usuario (no espera a n8n)
                                        └─► POST http://n8n:5678/webhook/pedido-creado
                                              (header x-cielum-token)
n8n: pedido-a-zoho
  Webhook ─► Validar pedido ─► ¿válido? ──no──► log "rechazado"
                                  │sí
                                  ▼
          Obtener token Zoho (refresh_token) ─► Buscar Contact por email
                                                   │
                                  ┌── existe ──────┴────── no existe ──┐
                          Actualizar contacto                   Crear contacto
                                  └──────────────┬─────────────────────┘
                                          Preparar log éxito
   (cualquier nodo de Zoho que falle) ─► Preparar log error
                                                 ▼
                     INSERT en log_integraciones (PostgreSQL)
                                                 ▼
                      Enviar correo de notificación (Mailpit)

Si falla algo fuera de esas ramas (p. ej. Postgres caído) ─► Error Workflow ─► correo 🚨
```

**Manejo de errores, en capas:**

1. **API:** si n8n está caído o tarda más de 5 s, el pedido igual se crea; solo se escribe `[n8n] ...` en el log de la API.
2. **Validación:** pedido sin email válido, sin detalles o con token incorrecto → no se toca Zoho, queda en el log como `rechazado` y llega correo ❌.
3. **Zoho:** los nodos HTTP reintentan 1 vez y, si siguen fallando, salen por su **salida de error** → fila `error` en el log + correo ❌.
4. **Todo lo demás:** el **Error Workflow** manda un correo 🚨 con el nodo y el mensaje.

---

## 2. Levantar todo

```powershell
cd C:\dev\cielum-induccion-Caren-Giraldo\semana-2\proyecto
docker compose up -d --build
docker compose ps
```

| Servicio | URL |
|---|---|
| Frontend React | http://localhost:5173 |
| API | http://localhost:3001 |
| **n8n** | **http://localhost:5678** |
| **Mailpit (bandeja de correos)** | **http://localhost:8025** |
| Adminer (ver la BD) | http://localhost:8080 |

### 2.1 👩‍💻 TÚ – Crear la tabla `log_integraciones`

Tu volumen `pgdata` ya existía, así que `database.sql` **no** se vuelve a ejecutar. Crea la tabla una sola vez:

```powershell
Get-Content n8n\sql\log_integraciones.sql | docker exec -i cian_postgres psql -U postgres -d cielum_db
```

Debe responder `CREATE TABLE` y `CREATE INDEX` (dos veces). Comprueba en Adminer (sistema *PostgreSQL*, servidor `postgres`, usuario `postgres`, clave `password123`, base `cielum_db`).

---

## 3. 👩‍💻 TÚ – Configurar n8n (una sola vez)

### 3.1 Cuenta de dueño
Abre http://localhost:5678 y crea la cuenta *owner* (correo y contraseña locales; no es una cuenta en la nube).

### 3.2 Credenciales de Zoho en `n8n/.env`
El flujo pide un `access_token` nuevo en cada ejecución usando el **refresh_token**, igual que el pre-request de tu colección de Postman de la parte 6.

1. Copia la plantilla: `copy n8n\.env.example n8n\.env`
2. Llena `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET` y `ZOHO_REFRESH_TOKEN`.
   - Están en el *Current value* del entorno **zoho-crm** de Postman.
   - Si no tienes el refresh_token: en api-console.zoho.com → tu Self Client → *Generate Code* con scope `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ` → en Postman ejecuta **OAuth → 1. Generar tokens**.
3. Reinicia n8n para que lea el archivo: `docker compose up -d n8n`

> ⚠️ `n8n/.env` está en `.gitignore`. **No lo subas.** Revisa con `git status` antes de cada commit.

### 3.3 Credencial de PostgreSQL
*Overview → Create → Credential → Postgres*:

| Campo | Valor |
|---|---|
| Nombre | `Postgres Cielum` |
| Host | `postgres` |
| Database | `cielum_db` |
| User / Password | `postgres` / `password123` |
| Port | `5432` |
| SSL | Disable |

Clic en **Save** → debe decir *Connection tested successfully*.

### 3.4 Credencial de correo (SMTP → Mailpit)
*Create → Credential → SMTP*:

| Campo | Valor |
|---|---|
| Nombre | `SMTP Mailpit` |
| User / Password | (vacío) |
| Host | `mailpit` |
| Port | `1025` |
| SSL/TLS | apagado |

Los correos **no salen a Internet**: todos aparecen en http://localhost:8025. (Para enviar de verdad, cambias esta credencial por Gmail con contraseña de aplicación; el flujo no cambia).

### 3.5 Importar los flujos
**Opción A (interfaz):** *Create → Workflow → menú ⋯ → Import from File* y elige cada archivo:
- `n8n/pedido-a-zoho.json`
- `n8n/error-workflow.json`
- `n8n/ejercicios/basico-http-a-archivo.json`
- `n8n/ejercicios/avanzado-flujo-que-falla.json`

**Opción B (consola):**
```powershell
docker exec cian_n8n n8n import:workflow --input=/workflows/pedido-a-zoho.json
docker exec cian_n8n n8n import:workflow --input=/workflows/error-workflow.json
docker exec cian_n8n n8n import:workflow --input=/workflows/ejercicios/basico-http-a-archivo.json
docker exec cian_n8n n8n import:workflow --input=/workflows/ejercicios/avanzado-flujo-que-falla.json
```

### 3.6 Asignar credenciales a los nodos
Los JSON traen credenciales de ejemplo (`REEMPLAZAR`). En cada flujo abre los nodos con ⚠️ y elige la credencial que creaste:

- `pedido-a-zoho` → **Registrar en log_integraciones** (Postgres Cielum) y **Enviar correo de notificación** (SMTP Mailpit).
  En el nodo de Postgres verifica que *Schema* = `public` y *Table* = `log_integraciones` (si no la lista, vuelve a seleccionarla del desplegable).
- `error-workflow-aviso-correo` → **Avisar por correo** (SMTP Mailpit).

Guarda cada flujo (Ctrl + S).

### 3.7 Conectar el Error Workflow
En `pedido-a-zoho` (y en `ejercicio-avanzado-flujo-que-falla`): **⋯ → Settings → Error workflow → `error-workflow-aviso-correo`** → Save.

### 3.8 Activar el flujo
En `pedido-a-zoho` pulsa **Activate / Publish** (arriba a la derecha). Sin esto, la URL de producción `/webhook/pedido-creado` responde 404.

> Mientras pruebas dentro del editor puedes usar **Execute workflow** + la URL de prueba `/webhook-test/pedido-creado`, pero la API llama a la de producción.

---

## 4. Probar el reto

### 4.1 Camino feliz: crear un pedido
Desde el frontend (http://localhost:5173 → *Nuevo pedido*, cliente **2 – Maria Lopez**) o desde PowerShell:

```powershell
$login = Invoke-RestMethod -Method Post -Uri http://localhost:3001/auth/login `
  -ContentType 'application/json' -Body '{"email":"caren@cielum.com","password":"123456"}'

$pedido = @{ id_cliente = 2; estado = "Pendiente";
             detalles = @(@{ id_producto = 3; cantidad = 2; precio_unitario = 95000 }) } | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri http://localhost:3001/pedidos `
  -Headers @{ Authorization = "Bearer $($login.token)" } -ContentType 'application/json' -Body $pedido
```

Comprueba:

1. `docker logs cian_api --tail 5` → `[n8n] Pedido #N enviado al webhook`
2. n8n → **Executions** → ejecución en verde.
3. Zoho CRM → **Contactos** → *Maria Lopez* con la descripción "Último pedido Cielum #N…".
4. Adminer → `SELECT * FROM log_integraciones ORDER BY id_log DESC;` → fila `creado / exito`.
5. http://localhost:8025 → correo ✅.

**Repite el pedido** con el mismo cliente → ahora la acción debe ser `actualizado` (ya existía en Zoho).

### 4.2 Error de validación
Llama al webhook directamente con un correo inválido:

```powershell
$malo = '{"evento":"pedido.creado","pedido":{"id_pedido":999},"cliente":{"nombre":"Prueba","email":"no-es-correo"},"detalles":[]}'
Invoke-RestMethod -Method Post -Uri http://localhost:5678/webhook/pedido-creado `
  -Headers @{ "x-cielum-token" = "cielum-token-dev" } -ContentType 'application/json' -Body $malo
```
Resultado: fila `rechazado / error` con los motivos + correo ❌. Zoho no se toca.

### 4.3 Error de Zoho
Cambia `ZOHO_REFRESH_TOKEN` en `n8n/.env` por un valor inventado, `docker compose up -d n8n` y crea un pedido → fila `error` con "Zoho no devolvió access_token…" + correo ❌. Luego deja el valor bueno.

### 4.4 n8n apagado
`docker stop cian_n8n` → crea un pedido → la API responde **201** igual y en `docker logs cian_api` sale `[n8n] No se pudo llamar al webhook…`. Luego `docker start cian_n8n`.

---

## 5. Ejercicios

### Básico – Manual Trigger → HTTP Request → archivo
Abre `ejercicio-basico-http-a-archivo` → **Execute workflow**. Llama a `http://api:3000/prueba-db` (lista de productos), lo convierte a CSV y lo guarda en `/files`, que en tu PC es **`semana-2/proyecto/n8n/archivos/productos_AAAAMMDD_HHMMSS.csv`**.

> Variante con Google Sheet (opcional): cambia los dos últimos nodos por *Google Sheets → Append row* y crea la credencial OAuth de Google. Requiere un proyecto en Google Cloud, por eso se dejó con archivo.

### Intermedio – Bot Playwright con formulario de práctica
Ver [`rpa/README.md`](rpa/README.md#ejercicio-intermedio): `python ejercicios\formulario_practica.py`.

### Avanzado – Error Workflow por correo
Con el paso 3.7 hecho, abre `ejercicio-avanzado-flujo-que-falla` → **Execute workflow**. Llama a una ruta que no existe (404) → en Mailpit llega 🚨 *Falló el flujo…* con el nodo y el error.

> n8n solo dispara el Error Workflow en ejecuciones **automáticas** (webhook, schedule). Si al ejecutarlo a mano no llega el correo, actívalo y cámbiale el Manual Trigger por un *Schedule Trigger* de 1 minuto, o prueba apagando Postgres (`docker stop cian_postgres`) y creando un pedido: falla el nodo de log → correo 🚨.

---

## 6. Bot RPA – `reporte_diario.xlsx`

Instrucciones completas y la explicación de **por qué en la vida real esto se haría por API y cuándo sí se justifica el RPA** en [`rpa/README.md`](rpa/README.md). Resumen:

```powershell
cd rpa
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m playwright install chromium
python reporte_diario.py
```

---

## 7. Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| La API dice `webhook respondió 404` | El flujo no está activo | Paso 3.8 |
| Ejecución en rojo en *Validar pedido* con `$env` | n8n no permite leer variables | Verifica `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` en el compose y recrea: `docker compose up -d n8n` |
| `Token del webhook inválido` | Token de la API ≠ el de n8n | Ambos usan `N8N_WEBHOOK_TOKEN` (por defecto `cielum-token-dev`) |
| `Zoho no devolvió access_token` | `n8n/.env` vacío, mal escrito o refresh_token revocado | Revisa 3.2 y reinicia n8n |
| `INVALID_URL_PATTERN` o 404 en Zoho | Cuenta en otro centro de datos | Cambia `ZOHO_ACCOUNTS_URL` (p. ej. `https://accounts.zoho.eu`) |
| `relation "log_integraciones" does not exist` | No creaste la tabla | Paso 2.1 |
| El correo llega con campos vacíos | El nodo Postgres no devolvió la fila | En el nodo Postgres → *Options → Output Columns* = todas |
| El reporte RPA sale vacío de noche | Postgres guarda la fecha en UTC | `python reporte_diario.py --fecha <día siguiente>` |

---

## 8. 👩‍💻 TÚ – Checklist de lo manual

- [ ] `docker compose up -d --build` y ver los 8 servicios arriba.
- [ ] Crear la tabla `log_integraciones` (2.1).
- [ ] Crear cuenta owner en n8n (3.1).
- [ ] Copiar `n8n/.env.example` → `n8n/.env` y llenar Zoho (3.2).
- [ ] Credenciales **Postgres Cielum** y **SMTP Mailpit** (3.3, 3.4).
- [ ] Importar los 4 flujos y asignar credenciales (3.5, 3.6).
- [ ] Conectar el Error Workflow y activar `pedido-a-zoho` (3.7, 3.8).
- [ ] Probar 4.1 (crear y actualizar), 4.2 y 4.3.
- [ ] Ejecutar el ejercicio básico y el avanzado.
- [ ] Instalar Playwright y correr `formulario_practica.py` y `reporte_diario.py`.
- [ ] **Capturas** para evidencia (sugerido: guardarlas en `n8n/capturas/`):
  - flujo `pedido-a-zoho` en el editor, ejecución verde, contacto en Zoho, tabla `log_integraciones`, correo en Mailpit, correo 🚨 del Error Workflow, el Excel generado.
- [ ] Si cambias algo de los flujos en la interfaz, vuelve a exportarlos (*⋯ → Download*) y reemplaza el `.json` del repo **(revisa que no queden tokens dentro)**.
- [ ] Bitácora del día.
- [ ] Commit:
  ```powershell
  git status    # confirma que NO aparecen n8n/.env ni rpa/.env
  git add .
  git commit -m "Semana 2 parte 7: n8n (pedido-a-zoho, error workflow, ejercicios), webhook desde la API, bot RPA reporte diario y n8n en docker-compose"
  git push
  ```
