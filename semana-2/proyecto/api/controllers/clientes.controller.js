
const clientesService = require('../services/clientes.service');

// Obtener todos los clientes
async function listarClientes(req, res, next) {
    try {
        const clientes = await clientesService.obtenerClientes();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}

// Obtener un cliente por su ID
async function buscarCliente(req, res, next) {
    try {
        const cliente = await clientesService.obtenerClientePorId(
            parseInt(req.params.id)
        );

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        next(error);
    }
}

// Crear un cliente
async function registrarCliente(req, res, next) {
try {
const { nombre, email, telefono } = req.body;


    // Validar los campos obligatorios
    if (!nombre || !email || !telefono) {
        return res.status(400).json({
            error: 'El nombre, el email y el teléfono son obligatorios'
        });
    }

    const cliente = await clientesService.crearCliente(
        nombre, email, telefono
    );

    res.status(201).json(cliente);
} catch (error) {
    if (
        error.code === '23505' &&
        error.constraint === 'clientes_email_key'
    ) {
        return res.status(409).json({
            error: 'Ya existe un cliente registrado con ese correo'
        });
    }

    next(error);
}
}


// Actualizar un cliente
async function modificarCliente(req, res, next) {
    try {
        const { nombre, email, telefono } = req.body;
        const cliente = await clientesService.actualizarCliente(
            parseInt(req.params.id),
            nombre, email, telefono
        );

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        next(error);
    }
}

// Eliminar un cliente
async function borrarCliente(req, res, next) {
    try {
        const cliente = await clientesService.eliminarCliente(
            parseInt(req.params.id)
        );

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(409).json({
                error: 'No se puede eliminar el cliente porque tiene pedidos asociados'
            });
        }

        next(error);
    }
}

module.exports = {
    listarClientes,
    buscarCliente,
    registrarCliente,
    modificarCliente,
    borrarCliente
};