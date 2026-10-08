const express = require('express');
const app = express();

app.use(express.json());

// Ruta básica de salud
app.get('/salud', (req, res) => {
    res.json({
        estado: "ok",
        fecha: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});