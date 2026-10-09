
const productosService = require('../services/productos.service');

// Listar productos
async function listarProductos(req, res, next) {
    try {
        const productos = await productosService.obtenerProductos();
        res.json(productos);
    } catch (error) {
        next(error);
    }
}

// Buscar producto
async function buscarProducto(req, res, next) {
    try {
        const producto = await productosService.obtenerProductoPorId(
            parseInt(req.params.id)
        );

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        next(error);
    }
}

// Crear producto
async function registrarProducto(req, res, next) {
    try {
        const { nombre, precio, stock } = req.body;

        const producto = await productosService.crearProducto(
            nombre, precio, stock
        );

        res.status(201).json(producto);
    } catch (error) {
        next(error);
    }
}

// Actualizar producto
async function modificarProducto(req, res, next) {
    try {
        const { nombre, precio, stock } = req.body;

        const producto = await productosService.actualizarProducto(
            parseInt(req.params.id),
            nombre, precio, stock
        );

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        next(error);
    }
}

// Eliminar producto
async function borrarProducto(req, res, next) {
    try {
        const producto = await productosService.eliminarProducto(
            parseInt(req.params.id)
        );

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarProductos,
    buscarProducto,
    registrarProducto,
    modificarProducto,
    borrarProducto
};