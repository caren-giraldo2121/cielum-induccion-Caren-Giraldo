
const pedidosService = require('../services/pedidos.service');
const pedidosQuerySchema = require('../schemas/pedidosQuery.schema');

// Listar pedidos con filtro y paginación
async function listarPedidos(req, res, next) {
    try {
        const validacion = pedidosQuerySchema.safeParse(req.query);

        if (!validacion.success) {
            return res.status(400).json({
                error: 'Parámetros de consulta inválidos',
                detalles: validacion.error.issues.map(error => ({
                    campo: error.path.join('.'),
                    mensaje: error.message
                }))
            });
        }

        const { estado, pagina, limite } = validacion.data;

        const pedidos = await pedidosService.obtenerPedidos(
            estado, pagina, limite
        );

        res.json({
            pagina,
            limite,
            resultados: pedidos
        });
    } catch (error) {
        next(error);
    }
}

// Buscar pedido por ID
async function buscarPedido(req, res, next) {
    try {
        const pedido = await pedidosService.obtenerPedidoPorId(
            parseInt(req.params.id)
        );

        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        res.json(pedido);
    } catch (error) {
        next(error);
    }
}

// Crear pedido
async function registrarPedido(req, res, next) {
    try {
        const { id_cliente, estado, detalles } = req.body;

        const pedido = await pedidosService.crearPedido(
            id_cliente, estado, detalles
        );

        res.status(201).json({
            mensaje: 'Pedido creado correctamente',
            pedido
        });
    } catch (error) {
        next(error);
    }
}

// Actualizar pedido
async function modificarPedido(req, res, next) {
    try {
        const { id_cliente, estado } = req.body;

        const pedido = await pedidosService.actualizarPedido(
            parseInt(req.params.id),
            id_cliente,
            estado
        );

        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        res.json(pedido);
    } catch (error) {
        next(error);
    }
}

// Eliminar pedido
async function borrarPedido(req, res, next) {
    try {
        const pedido = await pedidosService.eliminarPedido(
            parseInt(req.params.id)
        );

        if (!pedido) {
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        res.json({
            mensaje: 'Pedido eliminado correctamente',
            pedido
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarPedidos,
    buscarPedido,
    registrarPedido,
    modificarPedido,
    borrarPedido
};