const clientesService = require('./clientes.service');

// URL del webhook de n8n (ver docker-compose.yml y README-parte-7.md)
const URL_WEBHOOK = process.env.N8N_WEBHOOK_URL;
const TOKEN_WEBHOOK = process.env.N8N_WEBHOOK_TOKEN || '';
const TIEMPO_MAXIMO_MS = 5000;

// Avisa a n8n que se creó un pedido.
// Se llama SIN await desde el controlador: si n8n está caído o lento,
// el pedido igual queda creado y la API responde normal. Solo se registra el error.
async function notificarPedidoCreado(pedido, detalles) {
    if (!URL_WEBHOOK) {
        console.warn('[n8n] N8N_WEBHOOK_URL no está configurada; no se notifica el pedido');
        return;
    }

    try {
        const cliente = await clientesService.obtenerClientePorId(pedido.id_cliente);

        const total = detalles.reduce(
            (suma, d) => suma + Number(d.cantidad) * Number(d.precio_unitario),
            0
        );

        const cuerpo = {
            evento: 'pedido.creado',
            fecha_evento: new Date().toISOString(),
            pedido,
            cliente: cliente
                ? { id_cliente: cliente.id_cliente, nombre: cliente.nombre, email: cliente.email, telefono: cliente.telefono }
                : { id_cliente: pedido.id_cliente },
            detalles,
            total
        };

        const respuesta = await fetch(URL_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-cielum-token': TOKEN_WEBHOOK
            },
            body: JSON.stringify(cuerpo),
            signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS)
        });

        if (!respuesta.ok) {
            console.error(`[n8n] El webhook respondió ${respuesta.status} para el pedido #${pedido.id_pedido}`);
            return;
        }

        console.log(`[n8n] Pedido #${pedido.id_pedido} enviado al webhook`);
    } catch (error) {
        console.error(`[n8n] No se pudo llamar al webhook para el pedido #${pedido.id_pedido}:`, error.message);
    }
}

module.exports = { notificarPedidoCreado };
