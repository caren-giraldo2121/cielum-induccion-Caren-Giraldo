# Bitácora Día 16-10 · [Repo inicial, README y entorno.md]
**Fecha:16/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

1. Componentes de archivo único (.vue): <template>, <script setup>, <style>.

Un componente de archivo único (SFC, Single-File Component) es un archivo con extensión .vue que permite agrupar la plantilla, la lógica de JavaScript y los estilos de un componente en un solo archivo.

- <template>: contiene la estructura de la interfaz que se va a mostrar.

- <script setup>: contiene la lógica del componente, como las variables, las funciones y las importaciones. Las variables y funciones declaradas en este bloque pueden utilizarse directamente en la plantilla.

- <style>: contiene las reglas CSS que definen la apariencia del componente. Puede utilizarse scoped para limitar los estilos al componente correspondiente.

Fuente: Vue.js. (s. f.-a). Component events. Recuperado el 16 de octubre de 2026, de https://vuejs.org/guide/components/events

2. Directivas: v-if, v-show, v-for, v-model, v-bind (:), v-on (@).

Las directivas son atributos especiales que comienzan con v- y permiten aplicar comportamientos reactivos al DOM, como mostrar elementos, recorrer listas, enlazar atributos y responder a eventos.

Directiva	        Definición y uso
v-if   	Renderiza un elemento cuando se cumple una condición. Si la condición es falsa, el elemento no se renderiza.
v-show	Controla la visibilidad del elemento mediante la propiedad CSS display. El elemento permanece en el DOM.
v-for	Repite un elemento o componente para mostrar los elementos de una lista.
v-model	Crea un enlace bidireccional entre los datos y determinados controles de formulario.
v-bind (:)	Enlaza dinámicamente atributos o propiedades con una expresión de JavaScript.
v-on (@)	Escucha eventos del DOM, como clics o cambios en formularios.

Fuente:Vue.js. (s. f.). Template syntax. https://vuejs.org/guide/essentials/template-syntax.html

3. Reactividad: ref vs. reactive.

Vue dispone de funciones para declarar datos reactivos, de modo que los cambios en esos datos puedan reflejarse automáticamente en la interfaz.

- ref(): recibe un valor y devuelve un objeto reactivo con una propiedad .value. Puede utilizarse con valores primitivos, como números y cadenas de texto, así como con objetos. En JavaScript se accede al valor mediante .value, mientras que en la plantilla se desenvuelve automáticamente en los casos habituales.

- reactive(): convierte un objeto en un proxy reactivo que permite detectar los cambios realizados en sus propiedades. Se utiliza con objetos y no directamente con valores primitivos.

La diferencia principal es que ref() permite almacenar distintos tipos de valores reactivos, mientras que reactive() se utiliza para convertir objetos en reactivos.

Fuente: Vue.js. (s. f.). Reactivity fundamentals. https://vuejs.org/guide/essentials/reactivity-fundamentals.html

4. computed y watch

Vue proporciona computed() y watch() para trabajar con cambios en los datos reactivos, pero tienen propósitos diferentes.
- computed(): permite definir una propiedad calculada a partir de datos reactivos. Su resultado se actualiza cuando cambian las dependencias utilizadas y se almacena en caché mientras estas no cambien.

- watch(): permite observar una fuente reactiva y ejecutar una función cuando se produce un cambio. Es útil para realizar efectos secundarios, como solicitar información a una API, actualizar otros datos o ejecutar operaciones asíncronas.

La diferencia principal es que computed() se utiliza para obtener un valor derivado de otros datos, mientras que watch() se utiliza para ejecutar acciones como respuesta a cambios.

Fuente: Vue.js. (s. f.). Computed properties. https://vuejs.org/guide/essentials/computed.html

5. Props y emits

Las props y los eventos permiten la comunicación entre componentes de Vue.

- Props: son propiedades que un componente declara para recibir datos desde el componente que lo utiliza, normalmente un componente padre. En Vue, las props se declaran mediante defineProps() cuando se utiliza <script setup>.

- Emits: son los eventos personalizados que un componente puede emitir para comunicar que ha ocurrido algo. En <script setup>, se pueden declarar mediante defineEmits() y emitir mediante la función que devuelve.

Fuente: Vue.js. (s. f.). Props. https://vuejs.org/guide/components/props.html

## Autoinvestigación avanzada:

1. Composition API vs. Options API

Vue permite escribir los componentes utilizando dos estilos de API: Options API y Composition API. Ambos estilos ofrecen las mismas capacidades y funcionan sobre el mismo sistema subyacente, pero organizan la lógica de los componentes de manera diferente.

- Options API: organiza la lógica mediante opciones como data, methods y mounted. Las propiedades definidas en estas opciones están disponibles mediante this dentro de las funciones del componente.

- Composition API: permite declarar directamente variables de estado reactivo dentro del ámbito de una función y combinar la lógica de diferentes funciones para manejar la complejidad. Incluye funciones como ref(), reactive() y los hooks del ciclo de vida.

Options API suele ser más fácil para principiantes porque organiza la lógica en grupos de opciones. Composition API ofrece mayor flexibilidad para organizar, extraer y reutilizar la lógica.

2. Composables (equivalente a custom hooks)

En Vue, un composable es una función que utiliza la Composition API para encapsular y reutilizar lógica con estado.
Cuando se desarrolla una aplicación, es frecuente que sea necesario reutilizar lógica para tareas comunes. En lugar de repetir esa lógica en distintos componentes, se puede extraer en una función reutilizable que gestione el estado y devuelva los valores o funciones que deben exponerse.
Por convención, los nombres de los composables comienzan con use, como useMouse() o useFetch(). Además, pueden utilizar funciones de la Composition API, incluidos los hooks del ciclo de vida, para configurar y limpiar efectos secundarios.
Los composables son similares a los custom hooks de React en cuanto a la capacidad de componer y reutilizar lógica, aunque se basan en el sistema de reactividad de Vue, que es diferente del modelo de ejecución de los hooks de React.

3. Vue Router y guardas de navegación.

Vue Router es el enrutador oficial de Vue.js y permite gestionar la navegación entre las diferentes páginas o vistas de una aplicación.

Las guardas de navegación (navigation guards) se utilizan principalmente para proteger las navegaciones, ya sea redirigiéndolas o cancelándolas.

4. Pinia para estado global.

Pinia es una biblioteca de gestión de estado para Vue que permite administrar y compartir el estado de una aplicación. Está mantenida por el equipo principal de Vue y se recomienda para nuevas aplicaciones.
El estado global resulta útil cuando varios componentes necesitan acceder a los mismos datos o modificarlos. Pinia permite organizar esos datos en stores (almacenes), que pueden contener:

- State: representa el estado de la aplicación y se define mediante una función que devuelve el estado inicial.
- Getters: permiten obtener valores derivados del estado, de manera similar a las propiedades calculadas (computed).
- Actions: contienen funciones que permiten realizar operaciones y modificar el estado.
Los almacenes se definen mediante defineStore().

5. Ciclo de vida: onMounted y onUnmounted.

onMounted(): registra una función que se ejecuta después de que el componente se ha montado y su estructura DOM se ha creado e insertado en el contenedor correspondiente. Se utiliza habitualmente para realizar operaciones que necesitan acceder al DOM.

onUnmounted(): registra una función que se ejecuta después de que el componente se ha desmontado. Se utiliza para limpiar efectos secundarios creados manualmente, como temporizadores, escuchadores de eventos del DOM o conexiones al servidor.

Estos hooks deben registrarse sincrónicamente durante la fase de setup() del componente.



