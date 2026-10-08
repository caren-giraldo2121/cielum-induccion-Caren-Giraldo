const express = require('express');
const { Pool } = require('pg');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(express.json());

// Conexión con PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

    const productoSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    precio: z.number().positive('El precio debe ser mayor que 0'),
    stock: z.number().int().nonnegative('El stock no puede ser negativo')
});
const validarProducto = (req, res, next) => {
    try {
        req.body = productoSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

// ====================
// SALUD DEL SERVIDOR
// ====================

app.get('/salud', (req, res) => {
    res.json({
        estado: "ok",
        fecha: new Date()
    });
});

// ====================
// CRUD EN MEMORIA
// ====================


app.get('/productos', async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT * FROM productos ORDER BY id_producto'
        );
        console.log("PRODUCTOS DESDE BD:", resultado.rows);

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener los productos'
        });
    }
});
app.post('/productos', validarProducto, async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;

        const resultado = await pool.query(
            `INSERT INTO productos (nombre, precio, stock)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre, precio, stock]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al crear el producto'
        });
    }
});

// Obtener un producto por ID
app.get('/productos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const resultado = await pool.query(
            'SELECT * FROM productos WHERE id_producto = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener el producto'
        });
    }
});

// Actualizar producto
app.put('/productos/:id', validarProducto, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, precio, stock } = req.body;

        const resultado = await pool.query(
            `UPDATE productos
             SET nombre = $1, precio = $2, stock = $3
             WHERE id_producto = $4
             RETURNING *`,
            [nombre, precio, stock, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al actualizar el producto'
        });
    }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const resultado = await pool.query(
            `DELETE FROM productos
             WHERE id_producto = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al eliminar el producto'
        });
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT * FROM clientes ORDER BY id_cliente'
        );

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener los clientes'
        });
    }
});

app.get('/clientes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const resultado = await pool.query(
            'SELECT * FROM clientes WHERE id_cliente = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener el cliente'
        });
    }
});

// ====================
// PRUEBA POSTGRESQL
// ====================
app.get('/prueba-db', async (req, res) => {
    try {
      const resultado = await pool.query('SELECT * FROM productos');

        res.json(resultado.rows);
    } catch (error) {
        console.log("ERROR REAL:");
        console.log(error);

        res.status(500).json({
            error: error.message,
            codigo: error.code
        });
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;

        const resultado = await pool.query(
            `INSERT INTO clientes (nombre, email, telefono)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre, email, telefono]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al crear el cliente'
        });
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, email, telefono } = req.body;

        const resultado = await pool.query(
            `UPDATE clientes
             SET nombre = $1, email = $2, telefono = $3
             WHERE id_cliente = $4
             RETURNING *`,
            [nombre, email, telefono, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al actualizar el cliente'
        });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const resultado = await pool.query(
            `DELETE FROM clientes
             WHERE id_cliente = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al eliminar el cliente'
        });
    }
});

app.get('/pedidos', async (req, res) => {
    try {
        const { estado } = req.query;

        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 10;

        const offset = (pagina - 1) * limite;

        let consulta = `
            SELECT *
            FROM pedidos
        `;

        let valores = [];

        if (estado) {
            consulta += ` WHERE estado = $1`;
            valores.push(estado);
        }

        consulta += ` ORDER BY id_pedido LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`;

        valores.push(limite, offset);

        const resultado = await pool.query(consulta, valores);

        res.json({
            pagina: pagina,
            limite: limite,
            resultados: resultado.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener los pedidos'
        });
    }
});

app.get('/pedidos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const resultado = await pool.query(
            'SELECT * FROM pedidos WHERE id_pedido = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener el pedido'
        });
    }
});

app.post('/pedidos', async (req, res) => {
    const client = await pool.connect();

    try {
        const { id_cliente, estado, detalles } = req.body;

        await client.query('BEGIN');

        // Crear el pedido
        const pedido = await client.query(
            `INSERT INTO pedidos (id_cliente, fecha_pedido, estado)
             VALUES ($1, CURRENT_DATE, $2)
             RETURNING *`,
            [id_cliente, estado]
        );

        const id_pedido = pedido.rows[0].id_pedido;

        // Crear los detalles del pedido
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

        res.status(201).json({
            mensaje: 'Pedido creado correctamente',
            pedido: pedido.rows[0]
        });

    } catch (error) {
        await client.query('ROLLBACK');

        console.error(error);

        res.status(500).json({
            error: 'Error al crear el pedido'
        });

    } finally {
        client.release();
    }
});
app.put('/pedidos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { id_cliente, estado } = req.body;

        const resultado = await pool.query(
            `UPDATE pedidos
             SET id_cliente = $1, estado = $2
             WHERE id_pedido = $3
             RETURNING *`,
            [id_cliente, estado, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al actualizar el pedido'
        });
    }
});

app.delete('/pedidos/:id', async (req, res) => {
    const client = await pool.connect();

    try {
        const id = parseInt(req.params.id);

        await client.query('BEGIN');

        // Eliminar los detalles del pedido
        await client.query(
            `DELETE FROM detalle_pedido
             WHERE id_pedido = $1`,
            [id]
        );

        // Eliminar el pedido
        const resultado = await client.query(
            `DELETE FROM pedidos
             WHERE id_pedido = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            await client.query('ROLLBACK');

            return res.status(404).json({
                error: 'Pedido no encontrado'
            });
        }

        await client.query('COMMIT');

        res.json({
            mensaje: 'Pedido eliminado correctamente',
            pedido: resultado.rows[0]
        });

    } catch (error) {
        await client.query('ROLLBACK');

        console.error(error);

        res.status(500).json({
            error: 'Error al eliminar el pedido'
        });

    } finally {
        client.release();
    }
});
// ====================
// SERVIDOR
// ====================

const PORT = 3000;
app.use((error, req, res, next) => {
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            error: 'Datos inválidos',
            detalles: error.issues
        });
    }

    console.error(error);

    res.status(500).json({
        error: 'Error interno del servidor'
    });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});