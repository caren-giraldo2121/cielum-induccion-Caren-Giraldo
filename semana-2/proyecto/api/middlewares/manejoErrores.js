const { z } = require('zod');

const manejoErrores = (error, req, res, next) => {
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            error: 'Datos inválidos',
            detalles: error.issues
        });
    }

    console.error(error);

    return res.status(500).json({
        error: 'Error interno del servidor'
    });
};

module.exports = manejoErrores;