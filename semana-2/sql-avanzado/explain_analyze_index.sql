-- PASO 1: Medir rendimiento ANTES de crear el índice
EXPLAIN ANALYZE 
SELECT * 
FROM pedidos 
WHERE id_cliente = 1;

-- PASO 2: Crear el índice para optimizar la búsqueda por cliente
CREATE INDEX idx_pedidos_cliente_id ON pedidos(id_cliente);

-- PASO 3: Medir rendimiento DESPUÉS de crear el índice (notarás que cambia a 'Index Scan')
EXPLAIN ANALYZE 
SELECT * 
FROM pedidos 
WHERE id_cliente = 1;