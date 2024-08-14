
    // Recursos globales comunes
    // Variables globales comunes
let tasks = [];
let counterTasks = 0;
const bootstrapColors = ["text-bg-primary", "text-bg-success", "text-bg-danger"];
let counterColors = -1;

const APIKEY = "WqH2tiQ4KnqLXBjOegB3JhanztNAGi7Z2V0E9zPP";
const selectSounds = [{id: 233645, description: "Beeping alarm sound"},
                      {id: 128138, description: "Loud alarm sound"},
                      {id: 246390, description: "Calm music alarm"},
                      {id: 626193, description: "Natural alarm sound"},
                      {id: 153316, description: "Please be alarmed"},
                      {id: 579575, description: "Dance style alarm"},
                      {id: 528648, description: "Beethoven style alarm"}                  
];
const alarmPlayers = document.getElementsByClassName("alarm-player");
const soundInstances = [];


    //Función para cambiar de color las tarjetas
function traverseColors() {
    counterColors++;
    counterColors > 2 && (counterColors = 0);
    return bootstrapColors[counterColors];
}

    //Función para establecer el tiempo en el que tiene que sonar la alarma de la tarea
function calculateDelay(task) {
    return task.alarmDateObj.getTime() - Date.now();
}

    //Función para realizar múltiples peticiones fetch simultáneas
function fetchSoundInstances() {
    selectSounds.forEach((selectSound, index) => {
        loadSounds(selectSound, index); 
    })
}

    //Función para cargar los sonidos en los elementos audio
async function loadSounds(selectSound, index) {
    try {
        const response = await fetch(`https://freesound.org/apiv2/sounds/${selectSound.id}/?token=${APIKEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        } 
        const soundInstance = await response.json();
        const soundUrl = soundInstance.previews["preview-hq-mp3"];
        alarmPlayers[index].src = soundUrl;
        soundInstances[index] = soundInstance;
        console.log(soundInstance);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    //Función para establecer las alarmas de las tareas cada vez que se cargue el DOM
function setAlarms() {
    tasks.forEach((task) => {
        if (task.alarmDateObj && calculateDelay(task) > 0) {
            setTimeout(() => {
                triggerAlarm(task);
            }, calculateDelay(task));
        }
    });
}

    //Función para desplegar una sweetalert y un sonido de alarma
function triggerAlarm(task) {
        task.alarmSound && alarmPlayers[task.alarmSound].play();
        Swal.fire({
            title: task.title,
            text: task.dateStr && task.timeStr && `El ${task.dateObj.toLocaleDateString()} a las ${task.dateObj.toLocaleTimeString()}`
          }).then(() => {
            if (task.alarmSound) {
                alarmPlayers[task.alarmSound].pause();
                alarmPlayers[task.alarmSound].currentTime = 0;
            } 
          });
}



