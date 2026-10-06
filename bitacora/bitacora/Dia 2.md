# Bitácora Día 01-10 · [Repo inicial, README y entorno.md]
**Fecha:01/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica

Autoinvestigación básica:
1. Git: ¿qué es una rama? branch
Una rama es una línea de desarrollo independiente dentro de tu repositorio. Te permite aislar tu trabajo para implementar nuevas características o corregir errores sin alterar la rama principal (main o master).

Ejemplo propio: En mi proyecto tenía mi propia línea de trabajo aislada llamada caren-giraldo, mientras otros compañeros podían estar trabajando en otras ramas.

Fuente: Chacon, S., & Straub, B. (s. f.). Pro Git. Git SCM. Recuperado el 1 de octubre de 2026, de https://git-scm.com/book/es/v2/Ramificaciones-en-Git-%C2%BFQu%C3%A9-es-una-rama%3F

git switch: Es un comando introducido en versiones recientes de Git diseñado exclusivamente para cambiar de rama o crear una nueva de forma más intuitiva.
git checkout: Es el comando clásico y multifuncional de Git. Se utiliza para cambiar de rama, restaurar archivos del directorio de trabajo o moverte entre commits específicos.

Ejemplo propio: - Para moverme desde la rama main hacia mi propio espacio de trabajo, ejecutaba
- Se utiliza este comando clásico cuando se necesita cambiarse de rama o incluso cuando se quiere restaurar archivos específicos dentro del directorio de trabajo.

Fuente: The Git Project. (s. f.). Git documentation. Git SCM. Recuperado el 1 de octubre de 2026, de https://git-scm.com/docs

¿Qué es un merge?
Es el proceso de combinar el historial de dos o más ramas. Toma los cambios independientes de una rama (por ejemplo, una rama de características) y los integra en otra (como la rama main).

Ejemeplo propio: Cuando termine de documentar en mi rama caren-giraldo, quise integrar todo ese avance hacia la rama principal (main), realizando un merge.

Fuente: Chacon, S., & Straub, B. (s. f.). Pro Git. Git SCM. Recuperado el 1 de octubre de 2026, de https://git-scm.com/book/es/v2/Ramificaciones-en-Git-%C2%BFQu%C3%A9-es-una-rama%3F

2. ¿Qué es un conflicto y cómo se resuelve?
Ocurre cuando dos ramas distintas modifican exactamente la misma línea de un archivo, o cuando intento fusionar código y Git no puede determinar automáticamente qué versión conservar.

Ejemplo propio: Cuando trabajaba en mi rama caren-giraldo y otro compañero modificamos exactamente la misma línea del proyecto al mismo tiempo, al intentar unirlos Git detenía el proceso y marcaba un conflicto.

Fuente: Chacon, S., & Straub, B. (s. f.). Pro Git. Git SCM. Recuperado el 1 de octubre de 2026, de https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Procedimientos-b%C3%A1sicos-de-ramificaci%C3%B3n-y-fusi%C3%B3n

3. ¿Qué es un Pull Request (PR)?
Es una propuesta formal en una plataforma de hospedaje de código (como GitHub) para fusionar los cambios realizados en una rama hacia otra, permitiendo que los revisores evalúen el código antes de integrarlo.

Ejemplo propio: Al terminar de documentar mis tareas y los avances de desarrollo en mi rama personal caren-giraldo dentro del proyecto Helpify, abría un Pull Request en la interfaz web de GitHub para enviar una solicitud formal de revisión y aprobación antes de que mis cambios se integraran de manera definitiva en la rama main.

Fuente: GitHub. (s. f.). Acerca de las solicitudes de incorporación de cambios (Pull requests). GitHub Docs. Recuperado el 1 de octubre de 2026, de https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-in-your-repository/about-pull-requests

4. JS: tipos de datos, let vs const vs var, == vs ===, condicionales, bucles, funciones normales vs flecha, arrays y objetos.
- Los tipos de datos definen qué clase de información puede almacenar una variable. JavaScript tiene tipos primitivos como String (texto), Number (números), Boolean (verdadero/falso), Undefined, Null, BigInt y Symbol. Además, existen los objetos, que incluyen arrays, funciones y otros elementos más complejos.

- let: declara variables cuyo valor puede cambiar y tiene alcance de bloque.
- const: declara constantes; no permite reasignar el valor de la variable.
- var: forma antigua de declarar variables; no tiene alcance de bloque y puede generar comportamientos inesperados, por lo que hoy se recomienda usar let o const.

- == (igualdad): compara valores realizando conversión automática de tipos si es necesario.
- === (igualdad estricta): compara valor y tipo de dato; no realiza conversiones. Es la opción recomendada.

- Los condicionales permiten ejecutar diferentes bloques de código según una condición sea verdadera o falsa. Los más usados son if, else if, else y switch.

- Los bucles permiten repetir instrucciones varias veces. Los más comunes son for, while y do...while.

- Una función normal se declara con la palabra clave function. Una función flecha (arrow function) utiliza la sintaxis =>, es más corta y se usa frecuentemente en JavaScript moderno.

- Un array es una estructura que permite almacenar varios valores en una sola variable, organizados por posiciones o índices.

- Un objeto es una colección de pares clave-valor que permite representar entidades con características o propiedades.

Fuentes: Mozilla Developer Network. (s. f.). JavaScript language overview. MDN Web Docs. Recuperado el 1 de octubre de 2026, de https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview
Mozilla Developer Network. (s. f.). Equality comparisons and sameness. MDN Web Docs. Recuperado el 1 de octubre de 2026, de https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness


## Autoinvestigación avanzada:

1. rebase vs merge
Rebase: Reorganiza los commits de una rama para colocarlos sobre otra base, manteniendo un historial más lineal.
Merge: Une los cambios de dos ramas y crea un commit de combinación cuando es necesario.

¿Cuándo usar cada uno?

- Rebase: cuando se quiere actualizar una rama propia con los últimos cambios de otra rama y mantener un historial limpio.
- Merge: cuando se quieren integrar ramas sin modificar el historial de commits existente.
- Evitar rebase: en commits que ya fueron compartidos con otros integrantes del equipo, porque puede modificar el historial.
- Evitar merge: cuando se busca específicamente mantener un historial lineal y se puede hacer la integración de forma segura mediante rebase.

2. stash

Permite guardar temporalmente cambios que todavía no se han confirmado con un commit, para poder cambiar de rama o realizar otra tarea sin perderlos.

3. cherry-pick

Permite seleccionar un commit específico y aplicarlo en otra rama, sin tener que integrar todos los cambios de la rama original.

4. reset (soft, mixed, hard)

reset permite mover una rama hacia un commit anterior y modificar el estado de los cambios dependiendo de la opción utilizada.

--soft: elimina el commit, pero conserva los cambios preparados (staged).
--mixed: elimina el commit y conserva los cambios en los archivos, pero los deja sin preparar.
--hard: elimina el commit y descarta también los cambios realizados.

5. reset vs revert
Reset: modifica el historial de la rama al moverla hacia otro commit.
Revert: crea un nuevo commit que deshace los cambios de un commit anterior.

Diferencia principal: reset modifica el historial existente, mientras que revert conserva el historial y agrega un nuevo commit para deshacer los cambios.

6. Tags

Los tags son etiquetas que permiten marcar un punto específico del historial de Git, normalmente para identificar versiones del proyecto.

7. GitFlow vs Trunk-Based Development

GitFlow es un modelo de trabajo que utiliza varias ramas con funciones específicas, como main, develop, feature, release y hotfix, permitiendo organizar el desarrollo y las versiones del proyecto de manera estructurada. Por otro lado, Trunk-Based Development trabaja principalmente sobre una rama principal (trunk), utilizando ramas pequeñas y de corta duración, con integraciones frecuentes.

8. JS: métodos de arrays (map, filter, reduce, find, some, every, sort), desestructuración, spread/rest, template literals, truthy/falsy, optional chaining (?.), nullish coalescing (??).

map(): crea un nuevo arreglo aplicando una función a cada elemento del arreglo original.
filter(): crea un nuevo arreglo con los elementos que cumplen una determinada condición.
reduce(): procesa los elementos de un arreglo y los combina para obtener un único resultado.
find(): busca y devuelve el primer elemento que cumple una condición.
some(): comprueba si al menos un elemento del arreglo cumple una condición.
every(): comprueba si todos los elementos del arreglo cumplen una condición.
sort(): ordena los elementos de un arreglo según un criterio determinado.
Desestructuración: permite extraer valores de arreglos u objetos y asignarlos directamente a variables.
Spread (...): permite expandir los elementos de un arreglo o las propiedades de un objeto.
Rest (...): permite reunir varios valores o argumentos en una sola variable.
Template literals: permiten crear cadenas de texto usando comillas invertidas y colocar expresiones dentro mediante ${}.
Truthy/Falsy: son valores que JavaScript interpreta como verdaderos o falsos cuando se utilizan en contextos booleanos.
Optional chaining (?.): permite acceder a propiedades o métodos sin generar un error cuando el valor anterior es null o undefined.
Nullish coalescing (??): permite utilizar un valor alternativo cuando el valor original es null o undefined.
