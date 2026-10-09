const productoSchema = require('../schemas/producto.schema');
const validarProducto = (req, res, next) => {
    const resultado = productoSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            error: 'Datos del producto inválidos',
            detalles: resultado.error.issues.map(error => ({
                campo: error.path.join('.'),
                mensaje: error.message
            }))
        });
    }

    req.body = resultado.data;
    next();
};
module.exports = validarProducto;