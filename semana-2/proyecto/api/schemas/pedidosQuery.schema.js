const { z } = require('zod');
const fecha = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD').optional();
const pedidosQuerySchema = z.object({
    estado: z.string().optional(),
    id_cliente: z.coerce.number().int().positive().optional(),
    desde: fecha,
    hasta: fecha,
    pagina: z.coerce.number().int().positive().default(1),
    limite: z.coerce.number().int().positive().max(100).default(10)
});
module.exports = pedidosQuerySchema;