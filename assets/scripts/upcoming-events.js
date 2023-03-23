// Captured constants and variables
const urlEvents = "https://mindhub-xj03.onrender.com/api/amazing";
const cardMain = document.getElementById("card-events");
const check_container = document.getElementById("check_container");
const input = document.querySelector('form > input');

// Fetch
async function fetchData(){
    try {
    fetch(urlEvents)
    .then((response) => response.json())
    .then((data) => {
    
    //Upcoming Events
    let arrayEvents = data.events.filter(events =>
        (events.date > data.currentDate)
    );

    // Events
    input.addEventListener('input', () => superFilter(arrayEvents, input.value));
    check_container.addEventListener('change', () => superFilter(arrayEvents));

    // Function calls 
    printCard(arrayEvents);
    createCheckboxes(arrayEvents);
    })
    }
    catch (error) {
        console.log("Error: " + error + ". Could not connect to the API.");
    }
}

fetchData()