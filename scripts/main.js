    
    // arriba va common-resources script

    // variables globales de main page 
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById("tasks-container");
const selectAlarm = document.getElementById("select-alarm");
let alarmIndex = selectAlarm.value;

    // Clase del Objeto Task: con propiedades y métodos específicos.
class Task {
    constructor(form) {
        this.title = form.get("title");
        this.description = form.get("description");
        this.datetimeStr = form.get("datetime");
        this.dateStr = this.datetimeStr && this.datetimeStr.split("T")[0];
        this.timeStr = this.datetimeStr && this.datetimeStr.split("T")[1];
        [this.year, this.month, this.day] = this.dateStr && this.processDate();
        [this.hour, this.minute] = this.timeStr && this.processTime();
        this.dateObj = this.processDateObj();
        this.place = form.get("place");
        this.people = form.get("people");
        this.materials = form.get("materials");
        this.alarmDateTimeStr = form.get("alarm-datetime");
        this.alarmDateStr = this.alarmDateTimeStr && this.alarmDateTimeStr.split("T")[0];
        this.alarmTimeStr = this.alarmDateTimeStr && this.alarmDateTimeStr.split("T")[1];
        this.alarmDateObj = this.processAlarmDateObj();
        this.alarmSound = form.get("select-alarm");
        this.id = getRandomId();
    }
    
    processDate() {
        const dateArray = this.dateStr.split("-").map((element) => parseInt(element));
        return dateArray;
    }
    processTime() {
        const timeArray = this.timeStr.split(":").map((element) => parseInt(element));
        return timeArray;
    }
    processDateObj() {
        if (this.datetimeStr) {
            return new Date(this.datetimeStr);
        }
    }
    processAlarmDateObj() {
        if (this.alarmDateTimeStr) {
            return new Date(this.alarmDateTimeStr);
        }
    }
}

    // Función para crear objetos de tipo Task
function createTask(form) {
    const task = new Task(form);
    return task;
}

    // Función para añadir las tareas a tasks, ordenarlas y guardarlas en el storage
function addTask(task) {
    tasks.push(task);
    
    saveTasksStorage(tasks);
    taskForm.reset();  // Vaciamos el formulario con el método reset()
}

    // Función para borrar una tarea específica de acuerdo al id y actualizar storage
function deleteTask(id) {
    tasks.forEach((task, index) => {
        task.id === id && tasks.splice(index, 1);
        });

    saveTasksStorage(tasks); 
}

    // Función para actualizar el display de las tareas
function showTasks(tasks) {
    tasksContainer.innerHTML = '';  // Reseteamos el contenedor de las tareas 
    counterColors = -1; // Reseteamos el orden de los colores
    counterTasks = 0; // Reseteamos el contador de tareas

    const div = document.createElement("div");
    tasksContainer.appendChild(div);
    div.className = "row g-md-4";

    tasks.forEach(task => {
        const color = traverseColors();  // Elegimos el siguiente color del array
        div.innerHTML += `
            <div class="col-lg-6">
                <div class="card ${color} p-3 h-100 text-center">
                    <div class="card-body d-flex align-items-center w-100 px-4 py-0" style="height: 80%;">
                        <ul class="list-group list-group-flush w-100">
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Título</h5>
                                <p class="card-text">${task.title}</p>
                            </li>
                        `;

        const taskItems = document.getElementsByClassName("list-group list-group-flush")[counterTasks];
        task.description && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Descripción</h5>
                                <p class="card-text">${task.description}</p>
                            </li>
                        `);

        task.dateObj && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Fecha</h5>
                                <p class="card-text">${task.dateObj.toLocaleDateString()}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Hora</h5>
                                <p class="card-text">${task.dateObj.toLocaleTimeString()}</p>
                            </li>
                        `);

        task.place && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Lugar</h5>
                                <p class="card-text">${task.place}</p>
                            </li>
                        `);

        task.people && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Personas</h5>
                                <p class="card-text">${task.people}</p>
                            </li>
                        `);

        task.materials && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Materiales</h5>
                                <p class="card-text">${task.materials}</p>
                            </li>
                        `);

        task.alarmDateObj && (taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Alarma</h5>
                                <p class="card-text">${task.alarmDateObj.toLocaleString()}</p>
                            </li>
                        `);

        const taskCard = document.getElementsByClassName("card p-3 h-100")[counterTasks];
        taskCard.innerHTML += `
                    <div class="card-body w-100 px-4">
                        <button href="#" class="btn btn-light w-100" id="${task.id}" name="delete">Borrar</button>
                    </div>                    
                `;  

        counterTasks++;  
    });
}

    //Función para establecer la alarma de la tarea recién agregada
function setAlarm(task) {
    if (task.alarmDateObj && calculateDelay(task) > 0) {
        setTimeout(() => {
            triggerAlarm(task);
        }, calculateDelay(task));
    }
}

function saveTasksStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}

    // Listeners
    //Listener para disparar la carga del elemento audio correspondiente a la opción seleccionada
selectAlarm.addEventListener("change", (e) => {
    if (alarmIndex) {
        alarmPlayers[alarmIndex].controls = false;  //opción seleccionada previamente
        alarmPlayers[alarmIndex].pause();
        alarmPlayers[alarmIndex].currentTime = 0;
    }
    
    alarmIndex = e.target.value;  //opción seleccionada actualmente
    if (alarmIndex) {
        alarmPlayers[alarmIndex].controls = true;
        alarmPlayers[alarmIndex].play();
    }
});

   // Listener para disparar la creación de tareas, guardarlas en tasks, en el storage y para actualizar display
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (alarmIndex) {
        alarmPlayers[alarmIndex].controls = false;  //opción seleccionada actualmente
        alarmPlayers[alarmIndex].pause();
        alarmPlayers[alarmIndex].currentTime = 0;
    }
    const form = new FormData(taskForm);
    const task = createTask(form);
    addTask(task);
    showTasks(tasks);
    const taskCard = document.getElementsByClassName("card p-3 h-100")[counterTasks-1]; 
    taskCard.scrollIntoView();  // para hacer scroll hacia la última tarea agregada
    setAlarm(task);
});

    // Abajo va common-listeners script