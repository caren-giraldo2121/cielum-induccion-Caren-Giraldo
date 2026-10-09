
const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/verificarToken');
const validarProducto = require('../middlewares/validarProducto');
const productosController = require('../controllers/productos.controller');

// Rutas protegidas
router.get('/', verificarToken, productosController.listarProductos);
router.get('/:id', verificarToken, productosController.buscarProducto);
router.post('/', verificarToken, validarProducto, productosController.registrarProducto);
router.put('/:id', verificarToken, validarProducto, productosController.modificarProducto);
router.delete('/:id', verificarToken, productosController.borrarProducto);

module.exports = router;