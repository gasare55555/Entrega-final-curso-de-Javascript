
    // Recursos globales comunes
let tasks = [];
let counterTasks = 0;
const bootstrapColors = ["text-bg-primary", "text-bg-success", "text-bg-danger"];
let counterColors = -1;

const APIKEY = "WqH2tiQ4KnqLXBjOegB3JhanztNAGi7Z2V0E9zPP";
const selectOptionSounds = [{id: 233645, description: "Beeping alarm sound"},
                            {id: 128138, description: "Loud alarm sound"},
                            {id: 246390, description: "Calm music alarm"},
                            {id: 626193, description: "Natural alarm sound"},
                            {id: 153316, description: "Please be alarmed"}                  
];
let alarmPlayers = document.getElementsByClassName("alarm-player");
let soundInstances = [];


function traverseColors() {
    counterColors++;
    counterColors > 2 && (counterColors = 0);
    return bootstrapColors[counterColors];
}

function calculateDelay(task) {
    return Date.parse(task.alarmDateTimeStr) - Date.now();
}

function fetchSoundInstances() {
    selectOptionSounds.forEach((selectOptionSound, index) => {
        loadAlarms(selectOptionSound, index); 
    })
}

async function loadAlarms(selectOptionSound, index) {
    const response = await fetch(`https://freesound.org/apiv2/sounds/${selectOptionSound.id}/?token=${APIKEY}`);
    const soundInstance = await response.json();
    const soundUrl = soundInstance.previews["preview-hq-mp3"];
    alarmPlayers[index].src = soundUrl;
    soundInstances[index] = soundInstance;
    console.log(soundInstance);
}

function setAlarms() {
    tasks.forEach((task) => {
        if (calculateDelay(task) > 0) {
            setTimeout(() => {
                triggerAlarm(task);
            }, calculateDelay(task));
        }
    });
}

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



