-- =========================================================================
-- 1. Vista Estándar (Dinámica: calcula los datos en tiempo de consulta)
-- =========================================================================
CREATE OR REPLACE VIEW v_ventas_mensuales AS
SELECT 
    DATE_TRUNC('month', fecha_pedido) AS mes,
    SUM(dp.cantidad) AS total_productos_vendidos,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos
FROM pedidos p
JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
GROUP BY DATE_TRUNC('month', fecha_pedido);


-- =========================================================================
-- 2. Vista Materializada (Almacenada físicamente en disco para alto rendimiento)
-- =========================================================================
CREATE MATERIALIZED VIEW mv_ventas_mensuales AS
SELECT 
    DATE_TRUNC('month', fecha_pedido) AS mes,
    SUM(dp.cantidad) AS total_productos_vendidos,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos
FROM pedidos p
JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
GROUP BY DATE_TRUNC('month', fecha_pedido);

-- Comando de mantenimiento para actualizar la vista materializada cuando sea necesario:
-- REFRESH MATERIALIZED VIEW mv_ventas_mensuales;