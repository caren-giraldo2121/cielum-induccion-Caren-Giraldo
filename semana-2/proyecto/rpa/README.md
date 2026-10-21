# Bot RPA – Reporte diario de pedidos (parte 7)

Bot en Python + Playwright que **se comporta como una persona**: abre el frontend React, inicia sesión con el usuario de prueba, filtra los pedidos del día, lee la tabla página por página y genera **`reporte_diario.xlsx`** (hoja *Pedidos* + hoja *Resumen* con conteo por estado).

## Estructura

```
rpa/
├── reporte_diario.py              ← bot del reto
├── ejercicios/
│   └── formulario_practica.py     ← ejercicio intermedio (formulario público + capturas)
├── capturas/                      ← pantallazos que toman los bots
├── requirements.txt
├── .env.example                   ← copiar como .env
└── reporte_diario.xlsx            ← se genera al correr el bot
```

## Cómo ejecutarlo (Windows / PowerShell)

Requisito: el proyecto levantado con `docker compose up -d` (el frontend React debe abrir en http://localhost:5173).

```powershell
cd semana-2\proyecto\rpa
python -m venv .venv
.\.venv\Scripts\Activate.ps1          # si da error de permisos: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
pip install -r requirements.txt
python -m playwright install chromium
copy .env.example .env                # opcional: cambia usuario, URL o fecha

python reporte_diario.py                       # pedidos de hoy, con ventana visible
python reporte_diario.py --fecha 2026-10-21    # otro día
python reporte_diario.py --headless            # sin ventana (como correría en un servidor)
```

Salida esperada:

```
[1/4] Abriendo http://localhost:5173/login
      Sesion iniciada
[2/4] Filtrando pedidos del 2026-10-21
[3/4] Leyendo la tabla de pedidos
      Pagina 1: 3 pedidos
[4/4] Generando reporte_diario.xlsx
Listo: 3 pedidos -> ...\rpa\reporte_diario.xlsx
```

Si algo falla, el bot guarda `capturas/rpa-error.png` con lo que había en pantalla en ese momento.

> **Ojo con la fecha:** el contenedor de Postgres usa hora UTC, así que un pedido creado después de las 7:00 p. m. (hora Colombia) queda con la fecha del día siguiente. Si el reporte sale vacío por la noche, prueba con `--fecha` del día siguiente.

### Ejercicio intermedio

```powershell
python ejercicios\formulario_practica.py
```

Llena el formulario de práctica oficial de Selenium (https://www.selenium.dev/selenium/web/web-form.html), lo envía, verifica el mensaje *Received!* y deja `capturas/formulario-lleno.png` y `capturas/formulario-enviado.png`.

---

## ¿Por qué en la vida real esto se haría mejor por API?

Este bot existe para practicar RPA, pero **para nuestro propio sistema es la forma equivocada de obtener los datos**. La misma información sale con una sola llamada:

```http
GET http://localhost:3001/pedidos?desde=2026-10-21&hasta=2026-10-21&limite=100
Authorization: Bearer <token>
```

| Criterio | Por API | Por RPA (este bot) |
|---|---|---|
| **Fragilidad** | El contrato (JSON) es estable y versionado. | Se rompe si alguien cambia un texto ("Buscar"), un `name` de un input o el diseño de la tabla. |
| **Velocidad** | Milisegundos, una petición. | Segundos: abre navegador, login, espera renders, pagina. |
| **Datos** | Trae todos los campos (y se puede pedir el detalle y el total). | Solo lo que la pantalla muestra: la tabla no tiene nombre del cliente ni total. |
| **Recursos** | Un script ligero o un nodo de n8n. | Un Chromium completo corriendo. |
| **Seguridad** | Token de servicio con permisos acotados. | Hay que guardar usuario y contraseña de una persona. |
| **Errores** | Códigos HTTP claros (401, 404, 500). | Hay que adivinar por qué no apareció un elemento (timeout). |
| **Mantenimiento** | Lo mantiene quien mantiene la API. | Cada cambio del frontend obliga a revisar el bot. |

Como **somos dueños de la API**, lo correcto sería un endpoint (o un nodo HTTP en n8n con *Schedule Trigger*) que consulte `/pedidos` y arme el Excel.

## ¿Cuándo SÍ se justifica el RPA?

- **No hay API** o es de pago/inaccesible: sistemas legados, portales de bancos, DIAN, operadores logísticos, portales de proveedores o del gobierno.
- **No podemos tocar el sistema**: software de un tercero sin integración ni base de datos accesible.
- **Solución puente**: mientras se construye la API, el bot elimina el trabajo manual ya.
- **Pruebas end-to-end**: verificar que el frontend realmente funciona como lo vería un usuario (aquí Playwright es la herramienta correcta, no un parche).
- **Tareas de bajo volumen y alto costo manual**: descargar un reporte diario de un portal, copiar datos de un PDF a un formulario web, etc.

Regla práctica: **API primero; RPA solo cuando no hay API o no la controlamos**, y siempre con capturas, logs y alertas porque se rompe más fácil.
