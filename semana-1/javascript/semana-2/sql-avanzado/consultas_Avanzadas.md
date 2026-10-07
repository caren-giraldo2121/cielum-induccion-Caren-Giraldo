1. ## Ventas totales mensuales
    SELECT 
        TO_CHAR(fecha_pedido, 'YYYY-MM') AS mes,
        SUM(d.cantidad * d.precio_unitario) AS ingresos_mensuales
    FROM pedidos p
    JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
    GROUP BY TO_CHAR(fecha_pedido, 'YYYY-MM')
    ORDER BY mes;

Respuesta
-----------------
2026-09	12530.00
2026-10	4827.50
-----------------

2. ## Top 3 de productos más vendidos en cantidad

SELECT 
    p.id_producto, 
    p.nombre, 
    SUM(d.cantidad) AS total_vendido
FROM productos p
JOIN detalle_pedido d ON p.id_producto = d.id_producto
GROUP BY p.id_producto, p.nombre
ORDER BY total_vendido DESC
LIMIT 3;

Respuesta
-----------------------
4	Monitor 24"	17
1	Laptop Gamer	16
3	Teclado Mecánico	12
-------------------------

3. ## Clientes cuyo gasto total supera el promedio general

WITH GastoClientes AS (
    SELECT 
        c.id_cliente, 
        c.nombre, 
        SUM(d.cantidad * d.precio_unitario) AS total_gasto
    FROM clientes c
    JOIN pedidos p ON c.id_cliente = p.id_cliente
    JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
    GROUP BY c.id_cliente, c.nombre
)
SELECT id_cliente, nombre, total_gasto
FROM GastoClientes
WHERE total_gasto > (SELECT AVG(total_gasto) FROM GastoClientes);

Respuesta
------------------------
5	Cliente 5	3676.50
10	Cliente 10	5200.00
1	Cliente 1	2750.00
------------------------

4. ## Categorización de productos según su precio

SELECT 
    nombre,
    precio,
    CASE 
        WHEN precio < 50 THEN 'Económico'
        WHEN precio BETWEEN 50 AND 200 THEN 'Medio'
        ELSE 'Premium'
    END AS categoria_precio
FROM productos;

Respuesta
-------------------------------
Laptop Gamer	1200.00	Premium
Mouse Inalámbrico	25.50	Económico
Teclado Mecánico	75.00	Medio
Monitor 24"	200.00	Medio
---------------------------------

5. ## Clientes recurrentes (que han comprado en más de un mes distinto)

SELECT 
    c.id_cliente, 
    c.nombre, 
    COUNT(DISTINCT TO_CHAR(p.fecha_pedido, 'YYYY-MM')) AS meses_activos
FROM clientes c
JOIN pedidos p ON c.id_cliente = p.id_cliente
GROUP BY c.id_cliente, c.nombre
HAVING COUNT(DISTINCT TO_CHAR(p.fecha_pedido, 'YYYY-MM')) > 1;

Respuesta: 
---------------------------
1	Cliente 1	2
2	Cliente 2	2
3	Cliente 3	2
5	Cliente 5	2
7	Cliente 7	2
8	Cliente 8	2
10	Cliente 10	2
--------------------------

6. ## Listado de pedidos con su estado, cliente y cantidad de ítems distintos

SELECT 
    p.id_pedido,
    c.nombre AS cliente,
    p.estado,
    p.fecha_pedido,
    COUNT(d.id_producto) AS variedad_productos,
    SUM(d.cantidad) AS unidades_totales
FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
GROUP BY p.id_pedido, c.nombre, p.estado, p.fecha_pedido;

Respuesta: 
---------------------------------------
6	Cliente 6	Completado	2026-09-30	1	1
27	Cliente 7	Completado	2026-09-25	1	3
22	Cliente 2	Completado	2026-09-12	1	2
8	Cliente 8	Completado	2026-10-06	1	3
19	Cliente 9	Completado	2026-09-20	1	1
15	Cliente 5	Completado	2026-09-20	1	2
11	Cliente 1	Completado	2026-09-30	1	2
26	Cliente 6	Completado	2026-09-25	1	1
7	Cliente 7	Completado	2026-09-20	1	1
21	Cliente 1	Completado	2026-09-18	1	1
5	Cliente 5	Completado	2026-09-18	1	1
3	Cliente 3	Completado	2026-10-03	1	3
12	Cliente 2	Completado	2026-09-10	1	1
29	Cliente 9	Completado	2026-09-29	1	1
30	Cliente 10	Completado	2026-09-22	1	2
16	Cliente 6	Completado	2026-09-27	1	2
20	Cliente 10	Completado	2026-10-06	1	2
24	Cliente 4	Completado	2026-09-23	1	2
23	Cliente 3	Completado	2026-09-18	1	1
17	Cliente 7	Completado	2026-10-04	1	2
13	Cliente 3	Completado	2026-10-05	1	2
18	Cliente 8	Completado	2026-09-15	1	2
4	Cliente 4	Completado	2026-09-09	1	1
2	Cliente 2	Completado	2026-10-01	1	2
9	Cliente 9	Completado	2026-09-26	1	2
1	Cliente 1	Completado	2026-10-06	1	2
10	Cliente 10	Completado	2026-10-02	1	2
14	Cliente 4	Completado	2026-09-08	1	1
25	Cliente 5	Completado	2026-10-06	1	3
28	Cliente 8	Completado	2026-09-22	1	2
---------------------------------------------

7. ## Última fecha de compra de cada cliente

SELECT 
    c.id_cliente,
    c.nombre,
    MAX(p.fecha_pedido) AS ultima_compra
FROM clientes c
JOIN pedidos p ON c.id_cliente = p.id_cliente
GROUP BY c.id_cliente, c.nombre
ORDER BY ultima_compra DESC;

Respuesta: 
----------------------------------------------
8	Cliente 8	2026-10-06
5	Cliente 5	2026-10-06
10	Cliente 10	2026-10-06
1	Cliente 1	2026-10-06
3	Cliente 3	2026-10-05
7	Cliente 7	2026-10-04
2	Cliente 2	2026-10-01
6	Cliente 6	2026-09-30
9	Cliente 9	2026-09-29
4	Cliente 4	2026-09-23
---------------------------------------------

8. ## Productos ordenados por stock (del menor al mayor) con indicador de urgencia

SELECT 
    nombre,
    stock,
    CASE 
        WHEN stock = 0 THEN 'Agotado'
        WHEN stock <= 5 THEN 'Stock Crítico'
        ELSE 'Stock Normal'
    END AS nivel_inventario
FROM productos
ORDER BY stock ASC;

Respuesta: 
----------------------------
Laptop Gamer	10	Stock Normal
Monitor 24"	15	Stock Normal
Teclado Mecánico	30	Stock Normal
Mouse Inalámbrico	50	Stock Normal
-----------------------------------

9. ## Pedidos realizados en los últimos 7 días

SELECT 
    id_pedido,
    id_cliente,
    fecha_pedido,
    estado
FROM pedidos
WHERE fecha_pedido >= CURRENT_DATE - INTERVAL '7 days';

Respuesta: 
------------------------------------
1	1	2026-10-06	Completado
2	2	2026-10-01	Completado
3	3	2026-10-03	Completado
6	6	2026-09-30	Completado
8	8	2026-10-06	Completado
10	10	2026-10-02	Completado
11	1	2026-09-30	Completado
13	3	2026-10-05	Completado
17	7	2026-10-04	Completado
20	10	2026-10-06	Completado
25	5	2026-10-06	Completado
----------------------------------------

10. ## Total de unidades de productos compradas por cada cliente

SELECT 
    c.id_cliente,
    c.nombre,
    SUM(d.cantidad) AS total_unidades_compradas
FROM clientes c
JOIN pedidos p ON c.id_cliente = p.id_cliente
JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
GROUP BY c.id_cliente, c.nombre
ORDER BY total_unidades_compradas DESC;

Respuesta: 
----------------------------------------
8	Cliente 8	7
3	Cliente 3	6
10	Cliente 10	6
5	Cliente 5	6
7	Cliente 7	6
1	Cliente 1	5
2	Cliente 2	5
6	Cliente 6	4
4	Cliente 4	4
9	Cliente 9	4
--------------------------------------

11. ## Ticket promedio de compra por cliente

WITH TotalesPorPedido AS (
    SELECT 
        p.id_cliente, 
        p.id_pedido, 
        SUM(d.cantidad * d.precio_unitario) AS total_pedido
    FROM pedidos p
    JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
    GROUP BY p.id_cliente, p.id_pedido
)
SELECT 
    c.id_cliente,
    c.nombre,
    ROUND(AVG(tp.total_pedido), 2) AS ticket_promedio
FROM clientes c
JOIN TotalesPorPedido tp ON c.id_cliente = tp.id_cliente
GROUP BY c.id_cliente, c.nombre
ORDER BY ticket_promedio DESC;

Respuesta: 
----------------------------------
10	Cliente 10	1733.33
5	Cliente 5	1225.50
1	Cliente 1	916.67
2	Cliente 2	500.00
9	Cliente 9	483.67
3	Cliente 3	341.83
8	Cliente 8	234.00
7	Cliente 7	158.67
6	Cliente 6	141.67
4	Cliente 4	50.50
-------------------------------------------

12. ## Ranking de clientes por el monto total gastado

SELECT 
    c.id_cliente,
    c.nombre,
    COALESCE(SUM(d.cantidad * d.precio_unitario), 0) AS total_gastado,
    RANK() OVER (ORDER BY COALESCE(SUM(d.cantidad * d.precio_unitario), 0) DESC) AS ranking
FROM clientes c
LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente
LEFT JOIN detalle_pedido d ON p.id_pedido = d.id_pedido
GROUP BY c.id_cliente, c.nombre;

Respuesta: 
------------------------------------------------
10	Cliente 10	5200.00	1
5	Cliente 5	3676.50	2
1	Cliente 1	2750.00	3
2	Cliente 2	1500.00	4
9	Cliente 9	1451.00	5
3	Cliente 3	1025.50	6
8	Cliente 8	702.00	7
7	Cliente 7	476.00	8
6	Cliente 6	425.00	9
4	Cliente 4	151.50	10
---------------------------------------