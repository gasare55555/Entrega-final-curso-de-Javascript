    
    // acá va common-resources script

    // variables globales de search page
const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const tasksContainer = document.getElementById("tasks-container");
let searchResult = [];


function searchTasks() {
    let searchValue = searchInput.value;

    if (searchValue) {
        searchValue = searchValue.toLowerCase();
        searchResult = tasks.filter((task) => {
            return task.title.toLowerCase().includes(searchValue) || task.description.toLowerCase().includes(searchValue) || task.dateObj.toLocaleDateString() == searchValue || convertMonth(task.month) == searchValue || task.year == searchValue || task.hour == searchValue || task.place.toLowerCase().includes(searchValue) || task.people.toLowerCase().includes(searchValue) || task.materials.toLowerCase().includes(searchValue)
        });

        searchInput.value = "";  // reseteamos el input
        searchResult.length == 0 && function (){
            alert("No hubieron coincidencias");
            tasksContainer.innerHTML = '';
            }();
        searchResult.length != 0 && showTasks();  

    } else {
        alert("El valor ingresado no es correcto");
        tasksContainer.innerHTML = '';
    }    
}

function showTasks() {
    tasksContainer.innerHTML = '';  // Reseteamos el contenedor de las tareas 
    counterColors = -1; // Reseteamos el orden de los colores
    counterTasks = 0;
    searchResult.sort((taskA, taskB) => taskA.dateObj.getTime() - taskB.dateObj.getTime()); //ordenamos las tareas en orden cronológico

    searchResult.forEach(task => {
        const color = traverseColors();  // Elegimos el siguiente color del array
        tasksContainer.innerHTML += `
            <div class="col-md-6 col-xl-4">
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

        taskItems.innerHTML += `
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Fecha</h5>
                                <p class="card-text">${task.dateObj.toLocaleDateString()}</p>
                            </li>
                            <li class="list-group-item ${color}">
                                <h5 class="card-title">Hora</h5>
                                <p class="card-text">${task.dateObj.toLocaleTimeString()}</p>
                            </li>
                        `

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


        const taskCard = document.getElementsByClassName("card p-3 h-100")[counterTasks];
        taskCard.innerHTML += `
                    <div class="card-body w-100 px-4">
                        <button href="#" class="btn btn-light w-100" id="${task.id}" name="delete">Borrar</button>
                    </div>                    
                `;
        
        counterTasks++;
    });
}

function convertMonth(monthNumber) {
    let monthStr = months.find((month, index) => index == (monthNumber - 1));
    return monthStr;
}

function deleteTask(id) {
    searchResult.forEach((task, index) => {
        task.id === id && searchResult.splice(index, 1);
        });
}


    // Listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTasks();
    const taskCard = document.getElementsByClassName("card p-3 h-100")[0]; 
    taskCard.scrollIntoView(); // para hacer scroll hacia la primera tarea desplegada
})

    // Acá va common-listeners script
