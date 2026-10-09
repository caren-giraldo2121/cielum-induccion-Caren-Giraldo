const express = require('express');
require('dotenv').config();

const pool = require('./db');


const clientesRoutes = require('./routes/clientes.routes');
const productosRoutes = require('./routes/productos.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const authRoutes = require('./routes/auth.routes');
const manejoErrores = require('./middlewares/manejoErrores');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    });
});

// Registrar las rutas
app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/auth', authRoutes);


 





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
app.use(manejoErrores);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

