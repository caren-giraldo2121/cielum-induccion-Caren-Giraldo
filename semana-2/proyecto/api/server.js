const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(express.json());

// Conexión con PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

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

let productos = [];
let idCounter = 1;

// Crear producto
app.post('/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;

    const nuevoProducto = {
        id: idCounter++,
        nombre,
        precio,
        stock
    };

    productos.push(nuevoProducto);

    res.status(201).json(nuevoProducto);
});

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    res.json(producto);
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    const { nombre, precio, stock } = req.body;

    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;

    res.json(producto);
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    const eliminado = productos.splice(indice, 1);

    res.json(eliminado[0]);
});

// ====================
// PRUEBA POSTGRESQL
// ====================

app.get('/prueba-db', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos');

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al conectar con PostgreSQL'
        });
    }
});

// ====================
// SERVIDOR
// ====================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});