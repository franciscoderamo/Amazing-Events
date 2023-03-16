// let cardMain = document.getElementById("card-events")
// let stringHtml =""


// for (events of data.events){
//     if(events.date >= data.currentDate){
//         stringHtml += `
//             <div class="col">
//                 <div class="card h-300 objetfitcover">
//                     <img src="${events.image}" class="card-img-top card__img" alt="${events.name}">
//                     <div class="card-body">
//                         <h5 class="card-title">${events.name}</h5>
//                         <p class="card-text line__clamp">${events.description}</p>
//                     </div>
//                     <div class="card-footer row-cols-1">
//                         <div class="position-absolute pt-2">
//                             <h5 class="text-muted">Price $${events.price}</h5>
//                         </div>
                        
//                         <div class="text-end">
//                             <a href="#" class="btn btn-sm btn-outline-primary mx-2">See more</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>`
//     }
// }
// cardMain.innerHTML = stringHtml

let arrayEvents = data.events.filter(events =>
    (events.date > data.currentDate)
);

// Captured constants and variables
const cardMain = document.getElementById("card-events");
const check_container = document.getElementById("check_container");
const input = document.querySelector('form > input');

// Events
input.addEventListener('input', superFilter);
check_container.addEventListener('change', superFilter);

// Function calls 
printCard(arrayEvents);
createCheckboxes(arrayEvents);


// Functions
function superFilter(){
    let firstFilter = filterByText(arrayEvents, input.value);
    let secondFilter = filterByCategories(firstFilter);
    printCard(secondFilter);
}

function createCheckboxes(array){
    let arrayCategories = array.map(element => element.category);
    // Order checkboxes
    let setCategories = new Set(arrayCategories.sort((a,b)=>{
        if(a<b){
            return -1
        }else if(a>b){
            return 1
        }else{
            return 0
        }
    }))

    let checks = '';
    setCategories.forEach(element => {
        checks += `<div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input btncheck" id="${element}" value="${element}" autocomplete="off"> 
        <label class ="form-check-label checkbox" for="${element}">${element}</label>
        </div>`
    })
    check_container.innerHTML = checks;
    return setCategories;
}

function filterByText(array, text){
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return filteredArray
}

function filterByCategories(array){
    let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')); // Convert from NodeList to Array
    // console.log(checkboxes);
    let checkboxesChecked = checkboxes.filter(check => check.checked);
    // console.log(checkboxesChecked);
    if(checkboxesChecked.length == 0){
        return array;
    }
    let categories = checkboxesChecked.map(check => check.id);
    // console.log(categories);
    let filteredArray = array.filter(elemento => categories.includes(elemento.category));
    // console.log(filteredArray);
    return filteredArray;
}

function printCard(array){
    if (array.length == 0){
        cardMain.innerHTML = '<h2 class="display-12 fw-bolder pt-5">There are no matching events.</h2>';
        return
    }
    let card = '';
    array.forEach(element => {
        card += `
        <div class="col">
            <div class="card h-300 objetfitcover">
                <img src="${element.image}" class="card-img-top card__img" alt="${element.name}">
                <div class="card-body">
                    <h5 class="card-title fs-5">${element.name}</h5>
                    <p class="card-text line__clamp">${element.description}</p>
                </div>
                <div class="card-footer row-cols-1">
                    <div class="position-absolute pt-2">
                        <h5 class="text-muted">Price $${element.price}</h5>
                    </div>
                    
                    <div class="text-end">
                        <a href="/details.html?id=${element._id}" class="btn btn-sm btn-outline-primary mx-2">See more</a>
                    </div>
                </div>
            </div>
        </div>`
    })

    cardMain.innerHTML = card;

}