const express = require('express');
const app = express();

app.use(express.json());

let productos = [];
let idCounter = 1;

// CREATE - Crear producto
app.post('/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const nuevoProducto = { id: idCounter++, nombre, precio, stock };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// READ (ALL) - Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// READ (ONE) - Obtener producto por ID
app.get('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
});

// UPDATE - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    
    const { nombre, precio, stock } = req.body;
    if (nombre) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (stock !== undefined) producto.stock = stock;
    
    res.json(producto);
});

// DELETE - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });
    
    const eliminado = productos.splice(index, 1);
    res.json(eliminado[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor intermedio en memoria corriendo en el puerto ${PORT}`);
});