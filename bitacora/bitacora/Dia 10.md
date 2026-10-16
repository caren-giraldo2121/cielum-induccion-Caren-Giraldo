# Bitácora Día 15-10 · [Repo inicial, README y entorno.md]
**Fecha:15/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. ¿Qué es React y qué es un componente? JSX.

- React: es una biblioteca de JavaScript que permite crear interfaces de usuario para páginas y aplicaciones web mediante componentes reutilizables.

- Componente: es una parte independiente de la interfaz, creada normalmente como una función de JavaScript que devuelve lo que se mostrará en pantalla. Por ejemplo, un botón, una barra de navegación o una tarjeta de producto.

- JSX: es una extensión de la sintaxis de JavaScript que permite escribir una estructura parecida a HTML dentro del código. Se utiliza frecuentemente en React para definir cómo se verá la interfaz.

Fuente: React. (s. f.). Agregar interactividad. https://es.react.dev/learn/adding-interactivity

2. Props vs. state y useState

- Props: son datos que un componente recibe desde otro componente, generalmente desde su componente padre. Se utilizan para compartir información y configurar cómo se muestra un componente.

- State (estado): es la información que un componente mantiene y que puede cambiar durante el uso de la aplicación.

- useState: es un Hook de React que permite declarar y actualizar el estado dentro de un componente funcional. Cuando se actualiza el estado, React puede volver a renderizar el componente para mostrar los cambios.

Fuente: React. (s. f.). Pasar props a un componente. https://es.react.dev/learn/passing-props-to-a-component

3. Eventos, renderizado condicional, listas y key

- Eventos: son acciones del usuario, como hacer clic en un botón, escribir en un campo o enviar un formulario. En React se utilizan propiedades como onClick y onChange para responder a estas acciones.

- Renderizado condicional: consiste en mostrar diferentes elementos según se cumpla una condición. Por ejemplo, mostrar un mensaje de bienvenida si el usuario inició sesión o un formulario si todavía no lo ha hecho.

- Listas: permiten mostrar varios elementos a partir de un arreglo de datos. Generalmente se utiliza el método map() para recorrer los datos y generar los elementos de la interfaz.

- key: es una propiedad que identifica de forma única cada elemento de una lista entre sus elementos hermanos. Ayuda a React a reconocer qué elementos se agregan, eliminan o modifican.

Fuente: React. (s. f.). Responder a eventos. https://es.react.dev/learn/responding-to-events
React. (s. f.). Renderizado condicional. https://es.react.dev/learn/conditional-rendering
React. (s. f.). Renderizar listas. https://es.react.dev/learn/rendering-lists

4. Formularios controlados

Un formulario controlado es aquel en el que React administra el valor de sus campos mediante el estado del componente. Se utiliza una variable de estado para guardar el valor y una función para actualizarlo cuando el usuario escribe. Normalmente se combina useState con las propiedades value y onChange.

Fuente: React. (s. f.). Agregar interactividad. https://es.react.dev/learn/adding-interactivity

5. Crear un proyecto con Vite
Vite es una herramienta de desarrollo para proyectos web que permite crear una estructura inicial, iniciar un servidor de desarrollo y preparar la aplicación para su publicación. Ofrece plantillas para diferentes tecnologías, incluida React.
Para crear un proyecto de React con Vite, se puede utilizar la terminal y ejecutar los siguientes comandos, uno por uno.

Fuente: Vite. (s. f.). Getting started. https://vite.dev/guide/


## Autoinvestigación avanzada:

1. useEffect: dependencias, limpieza, errores comunes (ciclos infinitos).

useEffect: es un Hook de React que permite sincronizar un componente con sistemas externos, como una API, un temporizador o una conexión. Sus dependencias indican cuándo debe volver a ejecutarse el efecto. La función de limpieza permite deshacer lo realizado, por ejemplo, desconectar una conexión o cancelar un temporizador. 

Un error común es generar un ciclo infinito cuando el efecto actualiza un estado y ese cambio hace que las dependencias vuelvan a cambiar, provocando que el efecto se ejecute repetidamente.

2. Custom hooks (useFetch, useAuth)

Custom hooks: son funciones propias que permiten reutilizar lógica entre varios componentes de React. Sus nombres comienzan con use, seguido de una palabra en mayúscula inicial. Por ejemplo, useFetch puede organizar la lógica para obtener datos de una API, mientras que useAuth puede reunir la lógica relacionada con la autenticación de usuarios.

3. Context API para estado global

Context API: es una funcionalidad de React que permite compartir información entre componentes sin tener que pasar las props manualmente por cada nivel intermedio. Puede utilizarse para compartir información del usuario que inició sesión, el idioma de la aplicación o el tema visual. Se utiliza mediante createContext y useContext, junto con un proveedor de contexto.

4. React Router: rutas, parámetros y rutas protegidas

React Router: es una biblioteca que permite administrar la navegación entre diferentes páginas o vistas de una aplicación React sin tener que crear una página HTML independiente para cada una.

- Rutas: relacionan una dirección URL con un componente, por ejemplo, /inicio o /productos.

- Parámetros: permiten recibir valores desde la URL, como /productos/15, donde 15 puede ser el identificador del producto.

- Rutas protegidas: son rutas a las que se limita el acceso según una condición, por ejemplo, comprobar si el usuario ha iniciado sesión antes de mostrar su perfil. Esta protección debe complementarse con la autorización en el servidor para proteger los datos.

5. useMemo, useCallback y cuándo no usarlos.

- useMemo: es un Hook que permite guardar el resultado de un cálculo entre renderizados, para evitar repetir cálculos costosos cuando sus dependencias no han cambiado.

- useCallback: permite conservar la definición de una función entre renderizados mientras sus dependencias permanezcan iguales.

- Cuándo no usarlos: no es necesario utilizarlos en todos los componentes. Si el cálculo es sencillo o no existe un problema de rendimiento, pueden añadir complejidad innecesaria al código. Es preferible optimizar cuando exista una necesidad real.

6. Manejo de estado del servidor: TanStack Query (opcional)

TanStack Query: es una biblioteca que facilita la obtención, el almacenamiento en caché, la sincronización y la actualización de datos que provienen de un servidor. Por ejemplo, permite consultar una API de productos, conservar temporalmente los resultados y volver a obtenerlos cuando sea necesario. Esto reduce la necesidad de gestionar manualmente todos esos procesos con estados y efectos de React.