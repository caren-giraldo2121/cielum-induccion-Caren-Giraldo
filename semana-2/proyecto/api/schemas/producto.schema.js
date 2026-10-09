const { z } = require('zod');
const productoSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    precio: z.number().positive('El precio debe ser mayor que 0'),
    stock: z.number().int().nonnegative('El stock no puede ser negativo')
});
module.exports = productoSchema;