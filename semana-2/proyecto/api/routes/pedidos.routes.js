
const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/verificarToken');
const validarPedido = require('../middlewares/validarPedido');
const pedidosController = require('../controllers/pedidos.controller');

router.get('/', verificarToken, pedidosController.listarPedidos);

router.get('/:id', verificarToken, pedidosController.buscarPedido);

router.post(
    '/',
    verificarToken,
    validarPedido,
    pedidosController.registrarPedido
);

router.put('/:id', verificarToken, pedidosController.modificarPedido);

router.delete('/:id', verificarToken, pedidosController.borrarPedido);

module.exports = router;