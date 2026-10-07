
INSERT INTO clientes (id_cliente, nombre, email) 
VALUES (1, 'Cliente Pruebas', 'prueba@correo.com') 
ON CONFLICT (id_cliente) DO NOTHING;

INSERT INTO productos (id_producto, nombre, stock, precio) 
VALUES (1, 'Producto Prueba', 10, 50.00) 
ON CONFLICT (id_producto) DO NOTHING;

INSERT INTO pedidos (id_pedido, id_cliente, fecha_pedido) 
VALUES (1, 1, CURRENT_TIMESTAMP) 
ON CONFLICT (id_pedido) DO NOTHING;

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) 
VALUES (1, 1, 2, 50.00)
ON CONFLICT DO NOTHING;

WITH ventas_por_cliente AS (
    SELECT 
        p.id_cliente,
        DATE_TRUNC('month', p.fecha_pedido) AS mes,
        COUNT(p.id_pedido) AS total_pedidos
    FROM pedidos p
    GROUP BY p.id_cliente, DATE_TRUNC('month', p.fecha_pedido)
)
SELECT 
    mes,
    id_cliente,
    total_pedidos,
    RANK() OVER (PARTITION BY mes ORDER BY total_pedidos DESC) AS ranking_cliente
FROM ventas_por_cliente;