-- =========================================================================
-- MOTOR: SQL Server (T-SQL)
-- DESCRIPCIÓN: Procedimiento almacenado transaccional para registro de pedidos
-- =========================================================================

CREATE OR ALTER PROCEDURE registrar_pedido
    @cliente_id INT,
    @producto_id INT,
    @cantidad INT
AS
BEGIN
    SET NOCOUNT ON;
    -- Inicia la transacción explícita
    BEGIN TRANSACTION;
    
    BEGIN TRY
        DECLARE @stock_actual INT;
        
        -- Verificar stock utilizando la columna 'id_producto' con bloqueo de actualización
        SELECT @stock_actual = stock 
        FROM productos WITH (UPDLOCK) 
        WHERE id_producto = @producto_id;
        
        -- Validación de stock: si no alcanza, aborta y hace rollback
        IF @stock_actual < @cantidad
        BEGIN
            RAISERROR('Stock insuficiente para procesar el pedido.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- 1. Insertar cabecera del pedido (usando 'id_cliente' y 'fecha_pedido')
        INSERT INTO pedidos (id_cliente, fecha_pedido) 
        VALUES (@cliente_id, GETDATE());
        
        DECLARE @pedido_id INT = SCOPE_IDENTITY();

        -- 2. Insertar detalle del pedido
        INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad) 
        VALUES (@pedido_id, @producto_id, @cantidad);

        -- 3. Descontar inventario
        UPDATE productos 
        SET stock = stock - @cantidad 
        WHERE id_producto = @producto_id;

        -- Confirmar transacción si todo es exitoso
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Revierte los cambios si ocurre cualquier fallo inesperado
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO