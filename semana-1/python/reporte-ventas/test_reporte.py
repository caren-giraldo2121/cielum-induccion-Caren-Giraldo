import pandas as pd
import pytest
from reporte import limpiar_datos, procesar_reportes

def test_limpiar_datos_elimina_nulos_y_duplicados():
    """Verifica que se filtren duplicados por ID y fechas corruptas."""
    datos_prueba = pd.DataFrame({
        'id_venta': ['V001', 'V001', 'V002'], # Duplicado
        'fecha': ['2026-01-10', '2026-01-10', 'fecha_invalida'], # Fecha inválida
        'producto': ['Laptop', 'Laptop', 'Mouse'],
        'ciudad': ['Bogotá', 'Bogotá', 'Medellín'],
        'cantidad': [1, 1, 2],
        'precio_unitario': [1000.0, 1000.0, 50.0]
    })
    
    df_limpio = limpiar_datos(datos_prueba)
    
    # Debe quedar solo V001 (sin duplicado) y V002 se cae por fecha inválida -> quedan 1 registro
    assert len(df_limpio) == 1
    assert df_limpio.iloc[0]['id_venta'] == 'V001'

def test_procesar_reportes_calcula_mes():
    """Verifica que el agrupamiento por mes calcule correctamente el total de ventas."""
    datos_prueba = pd.DataFrame({
        'id_venta': ['V001', 'V002'],
        'fecha': [pd.Timestamp('2026-01-15'), pd.Timestamp('2026-01-20')],
        'producto': ['Laptop', 'Mouse'],
        'ciudad': ['Bogotá', 'Medellín'],
        'cantidad': [1, 2],
        'precio_unitario': [100.0, 50.0],
        'total_venta': [100.0, 100.0]
    })
    
    datos_prueba['mes'] = datos_prueba['fecha'].dt.to_period('M').astype(str)
    ventas_mes, _, _ = procesar_reportes(datos_prueba)
    
    assert len(ventas_mes) == 1
    assert ventas_mes.loc[ventas_mes['Mes'] == '2026-01', 'Total Ventas'].values[0] == 200.0

def test_procesar_reportes_top_productos():
    """Verifica que se identifique correctamente el producto más vendido."""
    datos_prueba = pd.DataFrame({
        'id_venta': ['V001', 'V002', 'V003'],
        'fecha': [pd.Timestamp('2026-01-15'), pd.Timestamp('2026-01-16'), pd.Timestamp('2026-01-17')],
        'producto': ['Mouse', 'Mouse', 'Teclado'],
        'ciudad': ['Bogotá', 'Cali', 'Medellín'],
        'cantidad': [2, 3, 1],
        'precio_unitario': [20.0, 20.0, 50.0],
        'total_venta': [40.0, 60.0, 50.0]
    })
    
    _, _, top_productos = procesar_reportes(datos_prueba)
    
    # El Mouse tiene 2 + 3 = 5 unidades vendidas, debe estar de primero
    assert top_productos.iloc[0]['Producto'] == 'Mouse'
    assert top_productos.iloc[0]['Cantidad Vendida'] == 5