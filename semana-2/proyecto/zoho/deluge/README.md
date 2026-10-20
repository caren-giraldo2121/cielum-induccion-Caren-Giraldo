# Función Deluge: actualizar el Contact al crear un Deal

**Archivo:** `actualizar_contacto_desde_deal.dg`

## Qué problema resuelve

Cuando un vendedor crea un Deal, el Contact asociado no muestra cuál fue su último negocio. Esta función copia el nombre y el monto del Deal al Contact, para que al abrir la ficha del cliente se vea de inmediato su último negocio.

## Requisitos previos (campos en Contacts)

En **Configuración → Personalización → Módulos y campos → Contacts**, crea:

| Etiqueta | Tipo | Nombre de API esperado |
|---|---|---|
| Último Deal | Línea única | `Ultimo_Deal` |
| Monto último Deal | Moneda | `Monto_ultimo_Deal` |

> Zoho genera el nombre de API a partir de la etiqueta. Si te asigna otro (por ejemplo `ltimo_Deal` por la tilde), cópialo desde la columna "Nombre de API" y cámbialo en el código.

## Cómo instalarla

1. **Configuración → Automatización → Acciones → Funciones → Nueva función**.
2. Nombre: `actualizarContactoDesdeDeal`. Categoría: **Automatización**.
3. Pega el cuerpo del archivo `.dg` (desde `deal = ...` hasta el final).
4. **Editar argumentos** → agrega `dealId` y mapéalo a **Deals → Deal Id**.
5. **Guardar**.

## Cómo conectarla (workflow)

1. **Configuración → Automatización → Reglas de flujo de trabajo → Crear regla**.
2. Módulo: **Deals**. Nombre: `Actualizar contacto al crear Deal`.
3. Cuándo: **Al crear un registro**.
4. Condición: **Todos los Deals**.
5. Acción instantánea: **Función** → elige `actualizarContactoDesdeDeal`.
6. **Guardar**.

## Paso a paso del código

| Paso | Línea clave | Qué hace |
|---|---|---|
| 1 | `zoho.crm.getRecordById("Deals", ...)` | Lee el Deal recién creado con todos sus campos. |
| 2 | `deal.get("Contact_Name")` | Obtiene el Contact asociado. Si no hay, termina sin hacer nada. |
| 3 | `datos.put(...)` | Arma un mapa con los campos a actualizar. |
| 4 | `zoho.crm.updateRecord("Contacts", ...)` | Guarda los cambios en el Contact. |

Los `info` dejan registro en el log de la función, que sirve para depurar.

## Cómo probarla

1. Crea un Contact (ej. *Andrea Ramírez*).
2. Crea un Deal asociado a ese Contact (ej. *Licencias 2026*, monto 5.000.000).
3. Abre el Contact: los campos **Último Deal** y **Monto último Deal** deben estar llenos.
4. Si no se llenaron, revisa el log en **Funciones → actualizarContactoDesdeDeal → Registros de ejecución**.

También puedes probarla sin el workflow: en el editor de la función, usa **Guardar y ejecutar** y escribe el id de un Deal existente.
