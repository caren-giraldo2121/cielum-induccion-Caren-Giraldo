
const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/verificarToken');
const authController = require('../controllers/auth.controller');

// Iniciar sesión
router.post('/login', authController.login);

// Consultar perfil con autenticación
router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;

