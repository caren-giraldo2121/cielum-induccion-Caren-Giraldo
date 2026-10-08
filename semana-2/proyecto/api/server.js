const express = require('express');
const { Pool } = require('pg');
const { z } = require('zod');
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