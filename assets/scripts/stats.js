// Captured constants and variables
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let eventsPast = [], eventsUpcoming = [], tablePastEvents = [], tableUpcomingEvents = [];
let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
let table3 = document.getElementById("table3");

// Fetch
async function fetchData(){
    try {
        fetch(urlApi)
        .then((response) => response.json())
        .then((data) => {
            let arrayEvents = data.events;
            pastEvents(arrayEvents, data);
            percentageAttendanceAndCapacity(eventsPast);
            tablePastEvents.forEach(category => { revenues(eventsPast, category, "past")});
            tableUpcomingEvents.forEach(category => { revenues(eventsUpcoming, category, "upcoming")});
        })
    }catch (error) {
        console.error("Error: " + error + ". Could not connect to the API.");
    }
}

fetchData();

