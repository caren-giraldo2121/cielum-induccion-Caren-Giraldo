const fs = require('fs');
const path = require('path');

// Listas de nombres y ciudades comunes en español para reemplazar los originales
const nombresComunes = [
    "Carlos Pérez", "Ana Gómez", "Luis Rodríguez", "María López", 
    "José Martínez", "Lucía Fernández", "Andres Gómez", "Sofía Torres", 
    "David Ramírez", "Valentina Díaz"
];

const ciudadesComunes = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", 
    "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", 
    "Santa Marta", "Manizales"
];

function generarReporte(usuarios, posts) {
  
    const reporteConsolidado = usuarios.map((usuario, indice) => {
        const totalPosts = posts.filter(post => post.userId === usuario.id).length;
        
        return {
            // Si el índice existe en nuestra lista, usa el nombre común, si no, usa uno genérico
            usuario: nombresComunes[indice] || `Usuario ${usuario.id}`,
            ciudad: ciudadesComunes[indice] || "Ciudad Principal",
            cantidadDePosts: totalPosts
        };
    });

    // 1. Mostrar un reporte visualmente ordenado en la consola
    console.log("\n📊 --- REPORTE GENERAL CON NOMBRES COMUNES ---");
    console.table(reporteConsolidado);

    // 2. Guardar el archivo reporte.json con formato legible
    const rutaArchivo = path.join(__dirname, 'reporte.json');
    fs.writeFileSync(rutaArchivo, JSON.stringify(reporteConsolidado, null, 2), 'utf-8');
    
    console.log(`💾 Archivo JSON generado con éxito en: reporte.json\n`);
    
    return reporteConsolidado;
}

module.exports = { generarReporte };