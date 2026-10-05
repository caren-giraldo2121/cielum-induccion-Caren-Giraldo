from dataclasses import dataclass, field
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@dataclass
class Producto:
    id_producto: str
    nombre: str
    precio: float
    stock: int
    stock_minimo: int = 5

@dataclass
class Inventario:
    productos: dict[str, Producto] = field(default_factory=dict)

    def agregar_producto(self, producto: Producto):
        self.productos[producto.id_producto] = producto
        logging.info(f"Producto agregado: {producto.nombre} (ID: {producto.id_producto})")

    def descontar_existencias(self, id_producto: str, cantidad: int):
        if id_producto not in self.productos:
            raise ValueError(f"El producto con ID {id_producto} no existe en el inventario.")
        
        prod = self.productos[id_producto]
        if prod.stock < cantidad:
            raise ValueError(f"Stock insuficiente para '{prod.nombre}'. Disponible: {prod.stock}, Solicitado: {cantidad}")
        
        prod.stock -= cantidad
        logging.info(f"Descontadas {cantidad} unidades de '{prod.nombre}'. Stock actual: {prod.stock}")
        self._alertar_bajo_stock(prod)

    def _alertar_bajo_stock(self, producto: Producto):
        if producto.stock <= producto.stock_minimo:
            logging.warning(f"¡ALERTA! Stock bajo para el producto '{producto.nombre}' (ID: {producto.id_producto}). Stock actual: {producto.stock}")

------------------------------------------------------------------------------------
# Decorador

def medir_tiempo(func):
     import time
     from functools import wraps
    @wraps(func)
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fin = time.perf_counter()
        duracion = fin - inicio
        logging.info(f"Función '{func.__name__}' ejecutada en {duracion:.6f} segundos.")
        return resultado
    return wrapper
    ---------------------------------------------------------------------------------
# EJEMPLO DE EJECUCIÓN (Aplica el decorador a una función de prueba)

@medir_tiempo
def simular_operaciones():
    # 1. Crear el inventario y un producto
    mi_inventario = Inventario()
    p1 = Producto(id_producto="P001", nombre="Laptop Pro", precio=1200.0, stock=8, stock_minimo=5)
    
    # 2. Agregar producto
    mi_inventario.agregar_producto(p1)
    
    # 3. Descontar existencias (esto activará la alerta porque quedará por debajo de 5)
    mi_inventario.descontar_existencias("P001", 4)
dir
if __name__ == "__main__":
    simular_operaciones()