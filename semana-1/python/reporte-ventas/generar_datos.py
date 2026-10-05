import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker('es_ES')

def generar_csv_ventas(nombre_archivo="ventas.csv", total_registros=200):
    productos = ["Laptop Pro", "Teclado Mecánico", "Mouse Inalámbrico", "Monitor 24\"", "Audífonos Gamer", "Silla Ergonómica"]
    ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"]
    
    with open(nombre_archivo, mode='w', encoding='utf-8', newline='') as f:
        f.write("id_venta,fecha,producto,ciudad,cantidad,precio_unitario\n")
        
        fecha_inicio = datetime(2026, 1, 1)
        
        for i in range(1, total_registros + 1):
            id_v = f"V{i:03d}"
            # Fechas aleatorias en el año
            dias_aleatorios = random.randint(0, 90)
            fecha = (fecha_inicio + timedelta(days=dias_aleatorios)).strftime("%Y-%m-%d")
            
            # Introducir algunos errores de fecha a propósito para el módulo de limpieza (ej. formato invertido o vacíos)
            if i in [15, 45]:
                fecha = "2026/02/30" # Fecha inválida o mal escrita
            elif i in [88]:
                fecha = ""
                
            producto = random.choice(productos)
            ciudad = random.choice(ciudades)
            cantidad = random.randint(1, 5)
            precio = round(random.uniform(30.0, 1500.0), 2)
            
            # Introducir duplicados intencionales en ciertos IDs
            if i == 100:
                id_v = "V050" 

            f.write(f"{id_v},{fecha},{producto},{ciudad},{cantidad},{precio}\n")
            
    print(f"Archivo '{nombre_archivo}' generado exitosamente con {total_registros} registros.")

if __name__ == "__main__":
    generar_csv_ventas()