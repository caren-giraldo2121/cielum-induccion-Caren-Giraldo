
const pedidoSchema = require('../schemas/pedido.schema');

const validarPedido = (req, res, next) => {
    const resultado = pedidoSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            error: 'Datos del pedido inválidos',
            detalles: resultado.error.issues.map(error => ({
                campo: error.path.join('.'),
                mensaje: error.message
            }))
        });
    }

    req.body = resultado.data;
    next();
};

module.exports = validarPedido;