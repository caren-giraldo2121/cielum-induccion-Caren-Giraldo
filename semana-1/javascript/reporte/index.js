// semana-1/javascript/reporte/index.js
const { obtenerDatos } = require('./api');
const { generarReporte } = require('./usuarios');

async function iniciarApp() {
    try {
        const { usuarios, posts } = await obtenerDatos();
        generarReporte(usuarios, posts);
    } catch (error) {
        console.error("❌ El proceso falló:", error);
    }
}

iniciarApp();