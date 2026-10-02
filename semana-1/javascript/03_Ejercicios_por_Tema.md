## console.log("1. Inicio del script");

## setTimeout(() => {
    console.log("2. Timeout ejecutado (Macrotarea)");
}, 0);

## Promise.resolve().then(() => {
    console.log("3. Promesa resuelta (Microtarea)");
});

## console.log("4. Fin del script");

El código se ejecuta por prioridades en el Event Loop: primero las instrucciones normales
 (console.log), luego las promesas (Promise.resolve().then) en una "fila VIP" con prioridad absoluta,
  y al final los temporizadores (setTimeout), sin importar que tengan cero milisegundos de retraso. 
  Por eso las promesas siempre se imprimen antes que los timeouts.
  
1. Inicio del script
4. Fin del script
3. Promesa resuelta (Microtarea)
2. Timeout ejecutado (Macrotarea)