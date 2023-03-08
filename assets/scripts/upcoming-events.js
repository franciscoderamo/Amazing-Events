let cardMain = document.getElementById("card-events")
let stringHtml =""


for (events of data.events){
    if(events.date >= data.currentDate){
        stringHtml += `
            <div class="col">
                <div class="card h-300 objetfitcover">
                    <img src="${events.image}" class="card-img-top card__img" alt="${events.name}">
                    <div class="card-body">
                        <h5 class="card-title">${events.name}</h5>
                        <p class="card-text line__clamp">${events.description}</p>
                    </div>
                    <div class="card-footer row-cols-1">
                        <div class="position-absolute pt-2">
                            <h5 class="text-muted">Price $${events.price}</h5>
                        </div>
                        
                        <div class="text-end">
                            <a href="#" class="btn btn-sm btn-outline-primary mx-2">See more</a>
                        </div>
                    </div>
                </div>
            </div>`
    }
}
cardMain.innerHTML = stringHtml