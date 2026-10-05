-- ==========================================
-- 12 CONSULTAS BÁSICAS
-- ==========================================

-- 1. Listar todos los clientes
SELECT * FROM clientes;

-- 2. Listar productos con stock mayor a 20
SELECT * FROM productos WHERE stock > 20;

-- 3. Obtener los pedidos del cliente con id 1
SELECT * FROM pedidos WHERE id_cliente = 1;

-- 4. Mostrar el detalle completo del pedido 1 con nombre de producto
SELECT dp.id_detalle, p.nombre AS producto, dp.cantidad, dp.precio_unitario 
FROM detalle_pedido dp 
JOIN productos p ON dp.id_producto = p.id_producto 
WHERE dp.id_pedido = 1;

-- 5. Calcular el subtotal por línea de detalle
SELECT id_pedido, id_producto, cantidad, precio_unitario, (cantidad * precio_unitario) AS total_linea 
FROM detalle_pedido;

-- 6. Contar cuántos clientes hay registrados
SELECT COUNT(*) AS total_clientes FROM clientes;

-- 7. Precio máximo y mínimo de los productos
SELECT MAX(precio) AS precio_maximo, MIN(precio) AS precio_minimo FROM productos;

-- 8. Listar pedidos ordenados por fecha descendente
SELECT * FROM pedidos ORDER BY fecha_pedido DESC;

-- 9. Productos con precio entre 50 y 500
SELECT * FROM productos WHERE precio BETWEEN 50 AND 500;

-- 10. Buscar clientes cuyo nombre empiece con 'A'
SELECT * FROM clientes WHERE nombre LIKE 'A%';

-- 11. Suma total del stock disponible
SELECT SUM(stock) AS stock_total FROM productos;

-- 12. Cantidad de pedidos agrupados por su estado
SELECT estado, COUNT(*) AS total_pedidos 
FROM pedidos 
GROUP BY estado;