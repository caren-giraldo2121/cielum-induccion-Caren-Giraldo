-- ==========================================
-- DATOS FICTICIOS (DML)
-- ==========================================

INSERT INTO clientes (nombre, email, telefono) VALUES 
('Ana Gómez', 'ana.gomez@email.com', '3001234567'),
('Carlos Pérez', 'carlos.perez@email.com', '3109876543'),
('María Rodríguez', 'maria.rodriguez@email.com', '3205551234');

INSERT INTO productos (nombre, precio, stock) VALUES 
('Laptop Gamer', 1200.00, 15),
('Mouse Inalámbrico', 25.50, 50),
('Teclado Mecánico', 75.00, 30),
('Monitor 24"', 200.00, 20);

INSERT INTO pedidos (id_cliente, fecha_pedido, estado) VALUES 
(1, '2026-03-01', 'Completado'),
(2, '2026-03-02', 'Procesando'),
(1, '2026-03-03', 'Pendiente'),
(3, '2026-03-04', 'Completado');

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 1200.00),
(1, 2, 2, 25.50),
(2, 3, 1, 75.00),
(3, 4, 2, 200.00),
(4, 2, 1, 25.50),
(4, 3, 1, 75.00);