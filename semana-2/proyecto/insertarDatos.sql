-- 1. Insertar Usuarios
INSERT INTO usuarios (nombre, email, password) VALUES 
('Caren Giraldo', 'caren@cielum.com', '$2a$10$p2STb0jjl1Lly70ZPeAyfeXmiJqjcKVu5yKq9yJ0Nb./Ow4XF66cu'),
('Carlos Perez', 'carlos@cielum.com', '$2a$10$p2STb0jjl1Lly70ZPeAyfeXmiJqjcKVu5yKq9yJ0Nb./Ow4XF66cu');

-- 2. Insertar Clientes
INSERT INTO clientes (nombre, email, telefono) VALUES 
('Cliente Principal S.A.', 'contacto@empresa.com', '3001234567'),
('Maria Lopez', 'maria.lopez@gmail.com', '3119876543');

-- 3. Insertar Productos
INSERT INTO productos (nombre, precio, stock) VALUES 
('Monitor LG UltraWide 29', 1250000.00, 10),
('Teclado Mecanico RGB', 250000.00, 25),
('Mouse Inalambrico', 95000.00, 50);

-- 4. Insertar Pedidos y sus Detalles
INSERT INTO pedidos (id_cliente, estado) VALUES (1, 'Pendiente');

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 1250000.00),
(1, 2, 2, 250000.00);
