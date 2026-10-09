
const pool = require('../db');

// Obtener todos los clientes
async function obtenerClientes() {
    const resultado = await pool.query(
        'SELECT * FROM clientes ORDER BY id_cliente'
    );
    return resultado.rows;
}

// Obtener un cliente por su ID
async function obtenerClientePorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM clientes WHERE id_cliente = $1',
        [id]
    );
    return resultado.rows[0];
}

// Crear un cliente
async function crearCliente(nombre, email, telefono) {
    const resultado = await pool.query(
        `INSERT INTO clientes (nombre, email, telefono)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, email, telefono]
    );
    return resultado.rows[0];
}

// Actualizar un cliente
async function actualizarCliente(id, nombre, email, telefono) {
    const resultado = await pool.query(
        `UPDATE clientes
         SET nombre = $1, email = $2, telefono = $3
         WHERE id_cliente = $4
         RETURNING *`,
        [nombre, email, telefono, id]
    );
    return resultado.rows[0];
}

// Eliminar un cliente
async function eliminarCliente(id) {
    const resultado = await pool.query(
        `DELETE FROM clientes
         WHERE id_cliente = $1
         RETURNING *`,
        [id]
    );
    return resultado.rows[0];
}

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};