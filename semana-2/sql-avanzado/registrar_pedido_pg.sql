-- Motor: PostgreSQL
CREATE OR REPLACE PROCEDURE registrar_pedido(
    p_cliente_id INT,
    p_producto_id INT,
    p_cantidad INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_stock_actual INT;
    v_pedido_id INT;
BEGIN
    -- 1. Verificar stock con bloqueo de fila exclusivo para concurrencia
    SELECT stock INTO v_stock_actual 
    FROM productos 
    WHERE id_producto = p_producto_id 
    FOR UPDATE;

    -- 2. Validación de stock (si no hay, lanza excepción y hace rollback automático)
    IF v_stock_actual < p_cantidad THEN
        RAISE EXCEPTION 'Stock insuficiente. Stock actual: %, Solicitado: %', v_stock_actual, p_cantidad;
    END IF;

    -- 3. Insertar cabecera del pedido
    INSERT INTO pedidos (cliente_id, fecha) 
    VALUES (p_cliente_id, CURRENT_TIMESTAMP)
    RETURNING id_pedido INTO v_pedido_id;

    -- 4. Insertar detalle del pedido
    INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad) 
    VALUES (v_pedido_id, p_producto_id, p_cantidad);

    -- 5. Descontar inventario
    UPDATE productos 
    SET stock = stock - p_cantidad 
    WHERE id_producto = p_producto_id;
END;
$$;