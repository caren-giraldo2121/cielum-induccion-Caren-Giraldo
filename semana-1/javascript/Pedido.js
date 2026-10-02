const readline = require('readline');

// Función de espera basada en promesas (simula un retraso de red)
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clase para manejar el producto individual
class Item {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }
}

// Clase para manejar el pedido y los cálculos
class Pedido {
    constructor() {
        this.items = [];
        this.descuento = 0;
    }

    agregarItem(item) {
        this.items.push(item);
    }

    calcularTotal() {
        let subtotalGeneral = 0;
        for (let item of this.items) {
            subtotalGeneral += item.calcularSubtotal();
        }
        let montoDescuento = subtotalGeneral * (this.descuento / 100);
        let totalFinal = subtotalGeneral - montoDescuento;
        return totalFinal < 0 ? 0 : totalFinal;
    }

    aplicarDescuento(porcentaje) {
        this.descuento = porcentaje;
    }
}

// Configuración para escribir en la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hacerPregunta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// ==========================================
// 🚀 SIMULACIÓN DE 3 SERVICIOS ASÍNCRONOS
// ==========================================

// Servicio 1: Revisa el inventario (Tarda 0.8 segundos)
async function verificarStockEnBodega(nombre) {
    await esperar(800); 
    return `¡Stock confirmado! Hay suficientes unidades de ${nombre}.`;
}

// Servicio 2: Busca un cupón sorpresa de descuento (Tarda 1.5 segundos)
async function consultarCuponSorpresa() {
    await esperar(1500); 
    return 15; // Retorna un 15% de descuento de regalo
}

// Servicio 3: Guarda un registro interno (Tarda 0.5 segundos)
async function registrarAuditoria() {
    await esperar(500); 
    return "Auditoría interna guardada con éxito.";
}

// ==========================================
// 💻 FLUJO PRINCIPAL E INTERACTIVO
// ==========================================
async function iniciarSistema() {
    const miPedido = new Pedido();

    console.log("\n🛒 ¡Hola! Bienvenido a tu sistema de pedidos inteligente.");
    console.log("Por favor, ingresa los datos de lo que deseas comprar:\n");
    
    // 1. Ingreso manual por teclado
    const nombre = await hacerPregunta("👉 ¿Qué producto vas a llevar? ");
    const precioStr = await hacerPregunta("👉 ¿Cuánto cuesta cada unidad ($)? ");
    const cantidadStr = await hacerPregunta("👉 ¿Cuántas unidades quieres? ");

    const productoElegido = new Item(nombre, parseFloat(precioStr), parseInt(cantidadStr));
    miPedido.agregarItem(productoElegido);

    console.log("\n⏳ Un momento... conectando con los servidores en paralelo...\n");

    // 2. Usando Promise.all (Ejecuta validaciones obligatorias al mismo tiempo)
    console.log("🔒 [Paso 1] Verificando inventario y seguridad (Usando Promise.all)...");
    try {
        const respuestaAll = await Promise.all([
            verificarStockEnBodega(productoElegido.nombre),
            registrarAuditoria()
        ]);
        console.log("   ✨ Éxito en las validaciones:", respuestaAll[0]);
    } catch (error) {
        console.log("   ❌ Hubo un problema con las validaciones.");
    }

    // 3. Usando Promise.allSettled (Busca ofertas sin miedo a que si una falla arruine todo)
    console.log("\n🎁 [Paso 2] Buscando cupones y ofertas (Usando Promise.allSettled)...");
    const respuestasSettled = await Promise.allSettled([
        consultarCuponSorpresa(),
        verificarStockEnBodega(productoElegido.nombre)
    ]);

    let descuentoAplicado = 0;

    respuestasSettled.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            // Si el servicio devolvió un número, asumimos que es el porcentaje de descuento
            if (typeof resultado.value === 'number') {
                descuentoAplicado = resultado.value;
                console.log(`   🎉 ¡Sorpresa! Encontramos un cupón activo del ${descuentoAplicado}% para ti.`);
            } else {
                console.log(`   ✅ Verificación extra completada:`, resultado.value);
            }
        } else {
            console.log(`   ⚠️️ El servicio #${index + 1} no respondió, pero continuamos sin problema.`);
        }
    });

    // Aplicamos el descuento al pedido
    miPedido.aplicarDescuento(descuentoAplicado);

    // 4. Resultado final limpio y ordenado
    console.log("\n==========================================");
    console.log("              🧾 RESUMEN FINAL            ");
    console.log("==========================================");
    console.log(`📦 Producto: ${productoElegido.cantidad}x ${productoElegido.nombre}`);
    console.log(`🏷️ Descuento aplicado: ${descuentoAplicado}%`);
    console.log(`💵 Total a pagar: $${miPedido.calcularTotal().toFixed(2)}`);
    console.log("==========================================");
    console.log("¡Gracias por usar el sistema! Hasta pronto 👋\n");

    rl.close();
}

iniciarSistema();