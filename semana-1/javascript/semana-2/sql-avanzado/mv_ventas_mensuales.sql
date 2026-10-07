-- 1. Crear la Vista Materializada (almacenada físicamente en disco para alto rendimiento)
DROP MATERIALIZED VIEW IF EXISTS mv_ventas_mensuales;

CREATE MATERIALIZED VIEW mv_ventas_mensuales AS
SELECT 
    DATE_TRUNC('month', fecha_pedido) AS mes,
    SUM(dp.cantidad) AS total_productos_vendidos,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos
FROM pedidos p
JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
GROUP BY DATE_TRUNC('month', fecha_pedido);

-- 2. Consultar los datos de la vista materializada
SELECT * FROM mv_ventas_mensuales;