
const authService = require('../services/auth.service');

// Iniciar sesión
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // Validar los datos obligatorios
        if (!email || !password) {
            return res.status(400).json({
                error: 'El correo y la contraseña son obligatorios'
            });
        }

        // Ejecutar la lógica del servicio
        const resultado = await authService.iniciarSesion(
            email,
            password
        );

        // Verificar las credenciales
        if (!resultado) {
            return res.status(401).json({
                error: 'Correo o contraseña incorrectos'
            });
        }

        // Responder con el usuario y el token
        return res.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: resultado.usuario,
            token: resultado.token
        });
    } catch (error) {
        next(error);
    }
}

// Consultar el perfil
function perfil(req, res) {
    res.json({
        mensaje: 'Acceso autorizado',
        usuario: req.usuario
    });
}

module.exports = { login, perfil };

