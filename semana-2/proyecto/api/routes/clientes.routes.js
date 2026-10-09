
const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/verificarToken');
const clientesController = require('../controllers/clientes.controller');


// Todas estas rutas requieren autenticación
router.get('/', verificarToken, clientesController.listarClientes);
router.get('/:id', verificarToken, clientesController.buscarCliente);
router.post('/', verificarToken, clientesController.registrarCliente);
router.put('/:id', verificarToken, clientesController.modificarCliente);
router.delete('/:id', verificarToken, clientesController.borrarCliente);

module.exports = router;