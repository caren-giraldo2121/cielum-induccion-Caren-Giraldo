const { z } = require('zod');
const pedidoSchema = z.object({
    id_cliente: z.number().int().positive(
        'El ID del cliente debe ser un entero mayor que 0'
    ),
    estado: z.string().trim().min(
        1,
        'El estado del pedido es obligatorio'
    ),
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