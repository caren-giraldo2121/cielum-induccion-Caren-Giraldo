
const pool = require('../db');

// Obtener pedidos con filtro y paginación
async function obtenerPedidos(estado, pagina, limite) {
    const offset = (pagina - 1) * limite;

    let consulta = 'SELECT * FROM pedidos';
    const valores = [];

    if (estado) {
        consulta += ' WHERE estado = $1';
        valores.push(estado);
    }

    consulta += ` ORDER BY id_pedido LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`;

    valores.push(limite, offset);

    const resultado = await pool.query(consulta, valores);

    return resultado.rows;
}

// Obtener un pedido por ID
async function obtenerPedidoPorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM pedidos WHERE id_pedido = $1',
        [id]
    );

    return resultado.rows[0];
}

// Crear pedido y sus detalles en una transacción
async function crearPedido(id_cliente, estado, detalles) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const pedido = await client.query(
            `INSERT INTO pedidos (id_cliente, fecha_pedido, estado)
             VALUES ($1, CURRENT_DATE, $2)
             RETURNING *`,
            [id_cliente, estado]
        );

        const id_pedido = pedido.rows[0].id_pedido;

        for (const detalle of detalles) {
            await client.query(
                `INSERT INTO detalle_pedido
                 (id_pedido, id_producto, cantidad, precio_unitario)
                 VALUES ($1, $2, $3, $4)`,
                [
                    id_pedido,
                    detalle.id_producto,
                    detalle.cantidad,
                    detalle.precio_unitario
                ]
            );
        }

        await client.query('COMMIT');

        return pedido.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Actualizar pedido
async function actualizarPedido(id, id_cliente, estado) {
    const resultado = await pool.query(
        `UPDATE pedidos
         SET id_cliente = $1, estado = $2
         WHERE id_pedido = $3
         RETURNING *`,
        [id_cliente, estado, id]
    );

    return resultado.rows[0];
}

// Eliminar pedido y sus detalles en una transacción
async function eliminarPedido(id) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM detalle_pedido WHERE id_pedido = $1',
            [id]
        );

        const resultado = await client.query(
            `DELETE FROM pedidos
             WHERE id_pedido = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            await client.query('ROLLBACK');
            return null;
        }

        await client.query('COMMIT');

        return resultado.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    obtenerPedidos,
    obtenerPedidoPorId,
    crearPedido,
    actualizarPedido,
    eliminarPedido
};