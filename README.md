# Gestor de Tareas
Este es un proyecto para la entrega final del curso de Javascript de Coder.  
El proyecto es un Gestor de Tareas que tendrá las siguientes características:

* En la página principal, vinculada a index.html, el usuario podrá ingresar múltiples tareas (gracias a la clase 
  Task, sus propiedades y métodos) a través de un formulario en el que podrá elegir si desea ingresar o no los 
  campos opcionales.
* Cada tarea constituirá un objeto, cuyas propiedades de descripción, lugar, fecha, hora, personas y materiales, 
  entre otras, serán ingresadas a través del formulario mencionado previamente.
* Se podrá vincular una alarma a cada tarea, ingresando una fecha y horas específicas, así como seleccionando un
  sonido específico de 7 opciones distintas.
* Objetos Date serán creados como propiedad en cada tarea, tanto para representar la fecha de realización de la tarea, 
  así como la fecha y hora en que sonará la alarma. 
* Los sonidos de las alarmas serán cargados en la aplicación a través de la función fetch() aplicada a la API de 
  freesound.org, manejando adecuadamente los posibles errores en la petición HTTP, y vinculando la carga al evento
  "DOMContentLoaded" para que los sonidos estén disponibles apenas inicia la aplicación.
* Las tareas serán almacenadas como objetos en un array y, además, en el Local Storage gracias a funciones específicas.

* En la página "Buscar Tarea", vinculada a search.html, el usuario tendrá la opción de realizar una búsqueda con 
  criterios específicos entre las tareas almacenadas, para luego, una vez ordenadas cronológicamente con la ayuda de 
  la función de segundo orden sort(), mostrar aquellas que coincidan con estos criterios.
* La comparación entre estos criterios específicos y la información de las tareas, guardada en
  las propiedades de los objetos, se realizará con la ayuda de la función de segundo orden filter().

* El display de las tareas y los resultados de búsqueda se realizará a través de la manipulación del DOM, 
  con ayuda de funciones de JavaScript, así como del framework Bootstrap para un adecuado display responsive.
* Este display de tareas actualizará su layout de forma interactiva, variando los colores de fondo a medida que
  el usuario ingresa tareas, así como ajustando el display de las cards de tal forma de mantener una altura
  homogénea por fila.
  
* El simulador podrá seguir funcionando "infinitamente" gracias a listeners actuando contantemente en segundo 
  plano, y asociados a eventos como "submit", "DOMContentLoaded" y "click".
* La arquitectura general del proyecto incluye 2 archivos html y 4 archivos js: 
  main.js y search.js contienen funciones y recursos específicos de index.html y search.html respectivamente. 
  common-resources.js y common-listeners.js contienen funciones y recursos comunes a ambas páginas html.

# Para ejecutar el proyecto

* Cargar el código en Visual Studio Code y usar la extensión Live Server para abrirlo en un navegador.
* O dirigirse a la sección de Deployments de la página del repositorio en Github y dar click en el enlace 
  que allí aparece para abrirlo en el navegador.