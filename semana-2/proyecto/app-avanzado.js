require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { z } = require('zod');

const app = express();
app.use(express.json());

// Aquí lee automáticamente la variable DATABASE_URL del archivo .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Esquema de validación con Zod
const productoSchema = z.object({
    nombre: z.string({ required_error: "El nombre es obligatorio" }).min(1, "El nombre no puede estar vacío"),
    precio: z.number({ required_error: "El precio es obligatorio" }).positive("El precio debe ser mayor a 0"),
    stock: z.number({ required_error: "El stock es obligatorio" }).int().nonnegative("El stock debe ser un entero no negativo")
});

// Middleware de validación
const validarEsquema = (req, res, next) => {
    try {
        productoSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

// --- RUTAS CON POSTGRESQL ---

app.get('/productos', async (req, res, next) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (error) {
        next(error);
    }
});

app.get('/productos/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
});

app.post('/productos', validarEsquema, async (req, res, next) => {
    try {
        const { nombre, precio, stock } = req.body;
        const resultado = await pool.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
            [nombre, precio, stock]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
});

app.put('/productos/:id', validarEsquema, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;
        const resultado = await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *',
            [nombre, precio, stock, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
});

app.delete('/productos/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado", producto: resultado.rows[0] });
    } catch (error) {
        next(error);
    }
});

// --- MIDDLEWARE GLOBAL DE ERRORES ---
app.use((err, req, res, next) => {
    if (err instanceof z.ZodError) {
        return res.status(400).json({
            estado: "error",
            mensaje: "Error de validación",
            errores: err.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
        });
    }

    console.error(err);
    res.status(500).json({
        estado: "error",
        mensaje: "Error interno del servidor"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor avanzado con PostgreSQL corriendo en el puerto ${PORT}`);
});