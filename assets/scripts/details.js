// Captured constants and variables
const data = "https://mindhub-xj03.onrender.com/api/amazing";
let params = new URLSearchParams(location.search)//Get parameters from url
let id = params.get("id");
let container = document.getElementById("card__details");
let html = "";

async function fetchData(){
    try {
    // Fetch
    fetch(urlEvents)
    .then((response) => response.json())
    .then((data) => {

    let card = data.events.find(info => info._id == id);

    // Function calls 
    printCardDetail(card);
    })
    }
    catch (error) {
        console.log("Error: " + error + ". Could not connect to the API.");
    }
}

fetchData();