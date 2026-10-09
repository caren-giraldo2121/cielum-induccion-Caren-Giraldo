
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Iniciar sesión
async function iniciarSesion(email, password) {
    // Buscar al usuario por su correo
    const resultado = await pool.query(
        'SELECT id_usuario, nombre, email, password FROM usuarios WHERE email = $1',
        [email]
    );

    // Verificar si el usuario existe
    if (resultado.rows.length === 0) {
        return null;
    }

    const usuario = resultado.rows[0];

    // Comparar la contraseña
    const passwordValida = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!passwordValida) {
        return null;
    }

    // Crear el token JWT
    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Devolver los datos sin la contraseña
    return {
        usuario: {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email
        },
        token
    };
}

module.exports = { iniciarSesion };

