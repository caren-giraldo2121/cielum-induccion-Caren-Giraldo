import pytest
from productoInventario import Producto, ProductoInventario

def test_agregar_producto():
    inventario = ProductoInventario()
    p = Producto(id_producto="P01", nombre="Mouse", precio=45.0, stock=10)
    inventario.agregar_producto(p)
    assert "P01" in inventario.productos
    assert inventario.productos["P01"].nombre == "Mouse"

def test_descontar_existencias_exitoso():
    inventario = ProductoInventario()
    p = Producto(id_producto="P02", nombre="Teclado", precio=120.0, stock=15)
    inventario.agregar_producto(p)
    inventario.descontar_existencias("P02", 5)
    assert inventario.productos["P02"].stock == 10

def test_descontar_stock_insuficiente():
    inventario = ProductoInventario()
    p = Producto(id_producto="P03", nombre="Monitor", precio=800.0, stock=3)
    inventario.agregar_producto(p)
    with pytest.raises(ValueError, match="Stock insuficiente"):
        inventario.descontar_existencias("P03", 5)

def test_descontar_producto_no_existe():
    inventario = ProductoInventario()
    with pytest.raises(ValueError, match="no existe en el inventario"):
        inventario.descontar_existencias("P99", 2)

def test_alerta_bajo_stock():
    inventario = ProductoInventario()
    p = Producto(id_producto="P04", nombre="Audífonos", precio=90.0, stock=6, stock_minimo=5)
    inventario.agregar_producto(p)
    inventario.descontar_existencias("P04", 2)
    assert p.stock <= p.stock_minimo