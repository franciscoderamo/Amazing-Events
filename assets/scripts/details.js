let params = new URLSearchParams(location.search)//Get parameters from url
let id = params.get("id")
let card = data.events.find(info => info._id == id)
let container = document.getElementById("card__details");

let html = "";

html +=  `<div class="row g-0">
            <div class="col-md-6">
                <img src="${card.image}" class="img-fluid rounded-start" alt="Museum Tour" width="100%">
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <h2 class="card-title fs-2">${card.name}</h2>
                    <p class="card-text pb-4">${card.description}</p>
                    <h3 class="card-text pb-1 fs-5">${card.category} at ${card.place}.</h3>
                    <h3 class="card-text pb-4">Date: ${card.date}.</h3>
                    <div class="position-absolute pt-3">
                        <h2 class="text-muted fs-5"><b>Price: $${card.price}</b></h2>
                    </div>

                    <div class="text-end pt-2">
                        <a href="/contact.html" class="btn btn-sm btn-outline-primary mx-2 fs-5">Contact</a>
                    </div>
                </div>
            </div>
            </div>`;

container.innerHTML = html