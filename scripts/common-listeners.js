
    // Listener para disparar el borrado de tareas, de tasks y del storage, y para actualizar display
tasksContainer.addEventListener('click', (e) => {
    // Ejecuta solo si presionamos en el botón borrar y para la propagación del evento en el bubbling phase.
    if (e.target.className.includes("btn")){
        deleteTask(e.target.id);
        showTasks(tasks);

        e.stopPropagation();  
    }
});

    // Listener para disparar la recuperación de los datos del storage y actualizar el display
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        // Para volver a convertir a objetos Date los strings devueltos por JSON
        tasks.forEach((task) => {
            if (task.dateObj) {
                task.dateObj = new Date(task.dateObj);
            }    
            if (task.alarmDateObj) {
                task.alarmDateObj = new Date(task.alarmDateObj);
            }  
        });
             
        document.title == "Gestor de Tareas" && showTasks(tasks);
        fetchSoundInstances();
        setAlarms();
    }
});