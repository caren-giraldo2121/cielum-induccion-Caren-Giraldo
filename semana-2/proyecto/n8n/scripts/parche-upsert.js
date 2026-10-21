// Parche para el flujo pedido-a-zoho ya importado en n8n (conserva credenciales y settings).
// Cambia "Crear contacto" por un UPSERT de Zoho (crea o actualiza por Email) y
// ajusta "Preparar log éxito" para leer data[0].action ('insert' | 'update').
//
// Uso (desde la carpeta semana-2/proyecto):
//   docker exec cian_n8n n8n export:workflow --id=<ID> --output=/tmp/wf.json
//   docker exec cian_n8n node /workflows/scripts/parche-upsert.js /tmp/wf.json
//   docker exec cian_n8n n8n import:workflow --input=/tmp/wf.json
const fs = require('fs');
const archivo = process.argv[2];
let wf = JSON.parse(fs.readFileSync(archivo, 'utf8'));
wf = Array.isArray(wf) ? wf[0] : wf;

const VAL = 'Validar pedido';
const TOKEN = 'Obtener token Zoho';
const buscar = (nombre) => {
  const n = wf.nodes.find((x) => x.name === nombre);
  if (!n) throw new Error('No encontré el nodo: ' + nombre);
  return n;
};

const crear = buscar('Crear contacto');
crear.parameters.method = 'POST';
crear.parameters.url = "={{ $('" + TOKEN + "').first().json.api_domain }}/crm/v8/Contacts/upsert";
crear.parameters.jsonBody =
  "={{ JSON.stringify({ data: [ $('" + VAL + "').first().json.zoho ], duplicate_check_fields: ['Email'] }) }}";
crear.notes = 'Upsert: si el Email ya existe en Zoho lo actualiza, si no lo crea (evita el retraso del índice de búsqueda).';

const log = buscar('Preparar log éxito');
log.parameters.jsCode = `// Arma la fila para log_integraciones cuando Zoho respondió bien
const v = $('Validar pedido').first().json;
const r = $input.first().json;
const detalle = (r.data && r.data[0]) || {};

// Fue actualizado si: la búsqueda lo encontró (nodo Actualizar contacto)
// o el upsert respondió action = 'update' (ya existía, pero la búsqueda aún no lo veía)
const fueActualizado = $('Actualizar contacto').isExecuted || detalle.action === 'update';

return [{
  json: {
    flujo: 'pedido-a-zoho',
    id_pedido: v.id_pedido,
    email_cliente: v.cliente.email,
    accion: fueActualizado ? 'actualizado' : 'creado',
    estado: 'exito',
    id_zoho: detalle.details ? String(detalle.details.id) : null,
    mensaje: fueActualizado
      ? 'El contacto ya existía en Zoho y se actualizó con el último pedido'
      : 'El contacto no existía en Zoho y se creó',
    payload: JSON.stringify(v.payload)
  }
}];`;

fs.writeFileSync(archivo, JSON.stringify(wf, null, 2));
console.log('OK: parche aplicado a', wf.name, '(' + wf.id + ')');
