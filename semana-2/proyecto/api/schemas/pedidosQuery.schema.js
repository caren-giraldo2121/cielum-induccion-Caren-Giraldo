const { z } = require('zod');
const pedidosQuerySchema = z.object({
    estado: z.string().optional(),
    pagina: z.coerce.number().int().positive().default(1),
    limite: z.coerce.number().int().positive().max(100).default(10)
});
module.exports = pedidosQuerySchema;