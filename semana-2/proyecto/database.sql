-- ============================================================
--  Esquema de la base de datos Cielum
--  Se ejecuta automaticamente al crear el contenedor de Postgres
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    telefono   VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    nombre      VARCHAR(150) NOT NULL,
    precio      NUMERIC(12,2) NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido    SERIAL PRIMARY KEY,
    id_cliente   INTEGER NOT NULL REFERENCES clientes(id_cliente),
    fecha_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
    estado       VARCHAR(50) NOT NULL DEFAULT 'Pendiente'
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
    id_detalle      SERIAL PRIMARY KEY,
    id_pedido       INTEGER NOT NULL REFERENCES pedidos(id_pedido),
    id_producto     INTEGER NOT NULL REFERENCES productos(id_producto),
    cantidad        INTEGER NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL
);

-- ============================================================
--  Datos iniciales
--  (contrasena de los usuarios de prueba: 123456)
-- ============================================================

INSERT INTO usuarios (nombre, email, password) VALUES
('Caren Giraldo', 'caren@cielum.com', '$2a$10$p2STb0jjl1Lly70ZPeAyfeXmiJqjcKVu5yKq9yJ0Nb./Ow4XF66cu'),
('Carlos Perez',  'carlos@cielum.com', '$2a$10$p2STb0jjl1Lly70ZPeAyfeXmiJqjcKVu5yKq9yJ0Nb./Ow4XF66cu');

INSERT INTO clientes (nombre, email, telefono) VALUES
('Cliente Principal S.A.', 'contacto@empresa.com', '3001234567'),
('Maria Lopez', 'maria.lopez@gmail.com', '3119876543');

INSERT INTO productos (nombre, precio, stock) VALUES
('Monitor LG UltraWide 29', 1250000.00, 10),
('Teclado Mecanico RGB', 250000.00, 25),
('Mouse Inalambrico', 95000.00, 50);

INSERT INTO pedidos (id_cliente, estado) VALUES (1, 'Pendiente');

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 1250000.00),
(1, 2, 2, 250000.00);
