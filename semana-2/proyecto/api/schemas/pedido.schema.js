const { z } = require('zod');

const ESTADOS_INICIALES = ['Pendiente', 'Pagado', 'Enviado'];

const pedidoSchema = z.object({
    id_cliente: z.number().int().positive(
        'El ID del cliente debe ser un entero mayor que 0'
    ),
    // Un pedido nuevo solo puede nacer Pendiente, Pagado o Enviado.
    // Entregado y Cancelado se asignan despues con PUT /pedidos/:id.
    estado: z.enum(ESTADOS_INICIALES, {
        message: `Un pedido nuevo solo puede crearse como: ${ESTADOS_INICIALES.join(', ')}`
    }).default('Pendiente'),
    detalles: z.array(
        z.object({
            id_producto: z.number().int().positive(
                'El ID del producto debe ser un entero mayor que 0'
            ),
            cantidad: z.number().int().positive(
                'La cantidad debe ser un entero mayor que 0'
            ),
            precio_unitario: z.number().positive(
                'El precio unitario debe ser mayor que 0'
            )
        })
    ).min(1, 'El pedido debe tener al menos un producto')
});
module.exports = pedidoSchema;