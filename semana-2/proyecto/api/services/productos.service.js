
const pool = require('../db');

// Obtener todos los productos
async function obtenerProductos() {
    const resultado = await pool.query(
        'SELECT * FROM productos ORDER BY id_producto'
    );
    return resultado.rows;
}

// Obtener un producto por ID
async function obtenerProductoPorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM productos WHERE id_producto = $1',
        [id]
    );
    return resultado.rows[0];
}

// Crear un producto
async function crearProducto(nombre, precio, stock) {
    const resultado = await pool.query(
        `INSERT INTO productos (nombre, precio, stock)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, precio, stock]
    );
    return resultado.rows[0];
}

// Actualizar un producto
async function actualizarProducto(id, nombre, precio, stock) {
    const resultado = await pool.query(
        `UPDATE productos
         SET nombre = $1, precio = $2, stock = $3
         WHERE id_producto = $4
         RETURNING *`,
        [nombre, precio, stock, id]
    );
    return resultado.rows[0];
}

// Eliminar un producto
async function eliminarProducto(id) {
    const resultado = await pool.query(
        `DELETE FROM productos
         WHERE id_producto = $1
         RETURNING *`,
        [id]
    );
    return resultado.rows[0];
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};