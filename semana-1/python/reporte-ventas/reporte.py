import argparse
import logging
import pandas as pd

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def limpiar_datos(df: pd.DataFrame) -> pd.DataFrame:
    """Limpia valores nulos, duplicados y fechas mal formateadas."""
    logging.info("Iniciando limpieza de datos...")
    
    # 1. Eliminar filas completamente vacías o duplicadas por ID de venta
    df = df.dropna(subset=['id_venta'])
    df = df.drop_duplicates(subset=['id_venta'], keep='first')
    
    # 2. Limpiar fechas inválidas o vacías
    df['fecha'] = pd.to_datetime(df['fecha'], errors='coerce')
    df = df.dropna(subset=['fecha']) # Elimina las que no se pudieron parsear
    
    # 3. Asegurar tipos numéricos correctos
    df['cantidad'] = pd.to_numeric(df['cantidad'], errors='coerce').fillna(0)
    df['precio_unitario'] = pd.to_numeric(df['precio_unitario'], errors='coerce').fillna(0.0)
    df['total_venta'] = df['cantidad'] * df['precio_unitario']
    
    logging.info(f"Limpieza finalizada. Registros válidos resultantes: {len(df)}")
    return df

def procesar_reportes(df: pd.DataFrame):
    """Calcula las métricas requeridas."""
    # Extraer mes
    df['mes'] = df['fecha'].dt.to_period('M').astype(str)
    
    # 1. Total por mes
    ventas_mes = df.groupby('mes')['total_venta'].sum().reset_index()
    ventas_mes.columns = ['Mes', 'Total Ventas']
    
    # 2. Total por ciudad
    ventas_ciudad = df.groupby('ciudad')['total_venta'].sum().reset_index()
    ventas_ciudad.columns = ['Ciudad', 'Total Ventas']
    
    # 3. Top 5 productos más vendidos (por cantidad total vendida)
    top_productos = df.groupby('producto')['cantidad'].sum().reset_index()
    top_productos.columns = ['Producto', 'Cantidad Vendida']
    top_productos = top_productos.sort_values(by='Cantidad Vendida', ascending=False).head(5)
    
    return ventas_mes, ventas_ciudad, top_productos

def generar_excel(ruta_salida: str, ventas_mes, ventas_ciudad, top_productos):
    """Genera un archivo Excel con una hoja por cada análisis."""
    logging.info(f"Generando reporte Excel en: {ruta_salida}")
    with pd.ExcelWriter(ruta_salida, engine='openpyxl') as writer:
        ventas_mes.to_excel(writer, sheet_name='Por Mes', index=False)
        ventas_ciudad.to_excel(writer, sheet_name='Por Ciudad', index=False)
        top_productos.to_excel(writer, sheet_name='Top 5 Productos', index=False)
    logging.info("Reporte Excel generado exitosamente.")

def main():
    parser = argparse.ArgumentParser(description="CLI para generación de reportes de ventas.")
    parser.add_argument("--entrada", required=True, help="Ruta al archivo CSV de entrada.")
    parser.add_argument("--salida", required=True, help="Ruta al archivo Excel de salida.")
    
    args = parser.parse_args()
    
    try:
        logging.info(f"Leyendo archivo de entrada: {args.entrada}")
        df = pd.read_csv(args.entrada)
        
        df_limpio = limpiar_datos(df)
        v_mes, v_ciudad, top_prod = procesar_reportes(df_limpio)
        generar_excel(args.salida, v_mes, v_ciudad, top_prod)
        
    except Exception as e:
        logging.error(f"Error durante la ejecución del reporte: {e}")

if __name__ == "__main__":
    main()