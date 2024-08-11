# Gestor de Tareas
Este es un proyecto para la Tercera Pre-entrega del curso de Javascript de Coder.  
El proyecto es un Gestor de Tareas que tendrá las siguientes características:

* El usuario podrá ingresar múltiples tareas (gracias a la clase Tarea, sus propiedades y métodos) a través
  de un formulario en el que podrá elegir si desea ingresar o no los campos opcionales.
* Cada tarea constituirá un objeto, cuyas propiedades de descripción, lugar, fecha, hora, personas y 
  materiales, entre otras, serán ingresadas a través de un formulario.
* Las tareas serán almacenadas como objetos en un array, y objetos Date serán creados como propiedad en cada tarea.
* Las tareas serán almacenadas además en el Local Storage gracias a funciones específicas.
* El usuario tendrá la opción de realizar una búsqueda con criterios específicos entre
  las tareas almacenadas, para luego, una vez ordenadas cronológicamente con la ayuda de la función de segundo 
  orden sort(), mostrar aquellas que coinciden con estos criterios en la página del sitio.
* La comparación entre estos criterios específicos y la información de las tareas, guardada en
  las propiedades de los objetos, se realizará con la ayuda de la función de segundo orden filter().
* El display de las tareas y los resultados de búsqueda se realizará a través de la manipulación del DOM, 
  con ayuda de funciones de JavaScript, así como del framework Bootstrap para un adecuado display responsive.
* Este display de tareas actualizará su layout de forma interactiva, variando los colores de fondo a medida que
  el usuario ingrese tareas, así como ajustando el alto de las cards de acuerdo al contenido ingresado en el 
  formulario.
* El simulador podrá seguir funcionando "infinitamente" gracias a los event listeners actuando contantemente
  en segundo plano.

# Para ejecutar el proyecto

* Copiar el código en Visual Studio Code y usar la extensión Live Server para abrirlo en un navegador.
* Dirigirse a la sección de Deployments de la página principal del repositorio de Github y dar click
  en el enlace que allí aparece para abrirlo en el navegador.