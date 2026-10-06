# Bitácora Día 05-10 · [Repo inicial, README y entorno.md]
**Fecha:05/10/2026**
**Horas invertidas:** autoinvestigación __ h · práctica _x_ h · reto __ h

## Autoinvestigación básica
1. Tipos de datos, listas, tuplas, diccionarios, sets: ¿cuándo usar cada uno?
existen distintos tipos de datos según la información que necesitemos guardar. Entre los tipos básicos están int, float, str y bool, y también existen estructuras como listas, tuplas, diccionarios y conjuntos (set).

- Lista (list)
Las listas son secuencias mutables, es decir, sus elementos pueden modificarse después de crearlas. Normalmente se utilizan para almacenar colecciones de elementos similares. Se usa una lista cuando necesitamos guardar varios datos y posiblemente agregar, eliminar o modificar elementos.

- Tupla (tuple)
Las tuplas son secuencias inmutables, lo que significa que sus elementos no pueden modificarse después de crear la tupla. Se usa una tupla cuando queremos guardar varios valores que no deberían cambiar.

- Diccionario (dict)
Un diccionario almacena información mediante pares clave:valor. Las claves deben ser únicas y permiten encontrar el valor asociado a ellas.
Se usa cuando necesitamos relacionar un dato con otro o identificar valores mediante un nombre.

- Set (set)
Un set es una colección que no permite elementos duplicados. También permite realizar operaciones como unión, intersección y diferencia entre conjuntos. Se utiliza principalmente cuando necesitamos eliminar elementos repetidos o comprobar si un elemento pertenece a una colección.

Fuente: Python Software Foundation. (2025). Estructuras de datos. Python Documentation. https://docs.python.org/es/3/tutorial/datastructures.html

2. Funciones, parámetros por defecto, *args y **kwargs.

- Las funciones 
Son bloques de código reutilizables que realizan una tarea específica. Se definen con la palabra clave def y pueden recibir parámetros

- Parámetros por defecto
Los parámetros por defecto son valores que se asignan a un parámetro al definir una función. Si al llamar la función no se proporciona un valor para ese parámetro, se utiliza el valor por defecto.

- *args
Cuando no se sabe cuántos argumentos posicionales recibirá una función, se utiliza *args. Estos argumentos se agrupan en una tupla.

- **kwargs
Cuando no se sabe cuántos argumentos por nombre recibirá una función, se utiliza **kwargs. Estos argumentos se almacenan en un diccionario, donde la clave es el nombre del argumento y el valor es el dato enviado.

Fuente: Python Software Foundation. (2026). More on defining functions. Python Documentation. https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions

3. ¿Qué es un entorno virtual (venv) y por qué se usa? ¿Qué es requirements.txt?

- ¿Qué es un entorno virtual?
Es un entorno aislado que permite instalar y administrar paquetes de manera independiente para un proyecto. Esto evita que las dependencias de un proyecto interfieran con las de otros proyectos. Se usa para que cada proyecto tenga sus propias dependencias y evitar conflictos entre proyectos.

- ¿Qué es requirements.txt?
requirements.txt es un archivo que contiene una lista de los paquetes o dependencias que necesita un proyecto, normalmente indicando también sus versiones.

Fuente: Fuente: Python Software Foundation. (2026). venv — Creation of virtual environments. Python Documentation. https://docs.python.org/3/library/venv.html

4. Lectura y escritura de archivos, manejo de excepciones (try/except/finally).

- Lectura y escritura de archivos
La lectura y escritura de archivos permite trabajar con información almacenada en archivos. Para abrir un archivo se utiliza open(), indicando el nombre del archivo y el modo en que se quiere abrir.

Los modos más comunes son:

r: abre el archivo para lectura.
w: abre el archivo para escritura y reemplaza el contenido existente.
a: abre el archivo para agregar contenido al final.

- Manejo de excepciones (try/except/finally)
El manejo de excepciones permite controlar los errores que pueden ocurrir durante la ejecución de un programa, evitando que el programa termine inesperadamente.

try: contiene el código que puede producir una excepción.
except: se ejecuta cuando ocurre una excepción.
finally: se ejecuta siempre, haya ocurrido o no una excepción.

Fuente: Python Software Foundation. (2026). Input and output. Python Documentation. https://docs.python.org/3/tutorial/inputoutput.html

5. List comprehensions y dict comprehensions.

- List comprehensions y dict comprehensions
Las comprehensions permiten crear nuevas colecciones a partir de otros elementos de una forma más compacta.

- List comprehensions
Una list comprehension permite crear una nueva lista a partir de una secuencia o iterable. Puede incluir una expresión y, opcionalmente, una condición.

Fuente: Python Software Foundation. (2026). Data structures. Python Documentation. https://docs.python.org/3/tutorial/datastructures.html

## Autoinvestigación avanzada:

1. POO en Python: clases, herencia, dataclasses, métodos mágicos (__str__, __repr__).

- Clases
Una clase permite agrupar datos y funcionalidades. Al crear una clase se crea un nuevo tipo de objeto, y sus instancias pueden tener atributos para mantener su estado y métodos para modificarlo.

- Herencia
La herencia permite crear una clase derivada a partir de una clase base. La clase derivada puede utilizar los atributos y métodos de la clase base y también puede redefinir sus métodos.

- dataclasses
Las dataclasses proporcionan una forma de agregar automáticamente métodos especiales a clases definidas por el usuario.

- Métodos mágicos
Los métodos mágicos son métodos especiales que tienen nombres rodeados por dobles guiones bajos, como __str__() y __repr__().

__str__() se utiliza para obtener una representación informal o más fácil de mostrar de un objeto. Es utilizado, por ejemplo, por print() y str()
__repr__() proporciona la representación oficial de un objeto y normalmente se utiliza para obtener una representación útil e inequívoca, especialmente durante la depuración.

2. Decoradores y context managers (with).

- Decoradores
Un decorador es una función que permite modificar o ampliar el comportamiento de otra función o método sin modificar directamente su código.
Se utiliza colocando @nombre_del_decorador antes de la función que queremos modificar.

- Context managers (with)
Un context manager es un objeto que define el contexto que se establece durante la ejecución de un bloque de código. Se utiliza normalmente mediante la instrucción with.
Una de sus funciones principales es encargarse correctamente de los recursos al entrar y salir del bloque. Entre sus usos se encuentran cerrar archivos abiertos, bloquear y desbloquear recursos y guardar o restaurar determinados estados.

3. Type hints y para qué sirven.

- Los type hints o anotaciones de tipo 
permiten indicar qué tipo de dato se espera que tenga una variable, un parámetro o el valor que devuelve una función. Las anotaciones pueden utilizarse para proporcionar información sobre los tipos que se esperan, principalmente para herramientas externas como verificadores de tipos, IDEs y linters.

Principalmente sirven para:
Indicar qué tipo de dato se espera.
Hacer el código más fácil de entender.
Ayudar a herramientas de desarrollo a detectar posibles errores.
Facilitar el mantenimiento del código

4. logging en vez de print. argparse para scripts de línea de comandos.

- logging es un sistema flexible para registrar eventos que ocurren durante la ejecución de una aplicación o biblioteca. A diferencia de usar print() para mostrar información, logging permite trabajar con diferentes niveles de registro, como DEBUG, INFO, WARNING, ERROR y CRITICAL.

- ¿Por qué usar logging?
Porque permite registrar y organizar los eventos del programa durante su funcionamiento., y esos registros pueden enviarse a diferentes destinos, como la consola o un archivo.

- argparse 
Es un módulo que facilita la creación de interfaces de línea de comandos. Permite definir los argumentos que necesita un programa, analizarlos y generar automáticamente mensajes de ayuda y de uso.

5. Pruebas con pytest.
pytest es un framework que permite escribir pequeñas pruebas de manera sencilla. Permite utilizar assert para verificar que una condición sea verdadera y detectar cuándo una prueba no produce el resultado esperado.
Se utiliza para comprobar automáticamente que el código funciona como se espera y detectar errores mediante pruebas.

6. pandas y openpyxl para manejo de datos y Excel.

- pandas
pandas permite trabajar con datos tabulares mediante estructuras como DataFrame, que organiza los datos en filas y columnas. Con pandas se pueden leer y escribir archivos de Excel.

- openpyxl
openpyxl puede utilizarse como motor para trabajar con archivos Excel .xlsx desde pandas.

En este caso, pandas se encarga de trabajar con los datos, mientras que openpyxl actúa como motor para leer el archivo Excel.