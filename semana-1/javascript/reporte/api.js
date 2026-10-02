// semana-1/javascript/reporte/api.js

async function obtenerDatos() {
    try {
        console.log("⏳ Consultando usuarios y posts...");
        
        // Usamos Promise.all para consumir ambos endpoints en paralelo
        const [resUsuarios, resPosts] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts')
        ]);

        if (!resUsuarios.ok || !resPosts.ok) {
            throw new Error("Error al conectar con la API de JSONPlaceholder.");
        }

        const usuarios = await resUsuarios.json();
        const posts = await resPosts.json();

        return { usuarios, posts };
    } catch (error) {
        console.error("❌ Error en api.js:", error.message);
        throw error;
    }
}

module.exports = { obtenerDatos };