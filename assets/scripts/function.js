// Functions
function superFilter(array) {
  let firstFilter = filterByText(array, input.value);
  let secondFilter = filterByCategories(firstFilter);
  printCard(secondFilter);
}

function createCheckboxes(array) {
  let arrayCategories = array.map((element) => element.category);
  // Order checkboxes
  let setCategories = new Set(
    arrayCategories.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
  );

  let checks = "";
  setCategories.forEach((element) => {
    checks += `<div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input btncheck" id="${element}" value="${element}" autocomplete="off"> 
        <label class ="form-check-label checkbox" for="${element}">${element}</label>
        </div>`;
  });
  check_container.innerHTML = checks;
  return setCategories;
}

function filterByText(array, text) {
  let filteredArray = array.filter((element) => element.name.toLowerCase().includes(text.toLowerCase()));
  return filteredArray;
}

function filterByCategories(array) {
  let checkboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  ); // Convert from NodeList to Array
  // console.log(checkboxes);
  let checkboxesChecked = checkboxes.filter((check) => check.checked);
  // console.log(checkboxesChecked);
  if (checkboxesChecked.length == 0) {
    return array;
  }
  let categories = checkboxesChecked.map((check) => check.id);
  // console.log(categories);
  let filteredArray = array.filter((elemento) =>
    categories.includes(elemento.category)
  );
  // console.log(filteredArray);
  return filteredArray;
}

function printCard(array) {
  if (array.length == 0) {
    cardMain.innerHTML =
      '<h2 class="display-12 fw-bolder pt-5">There are no matching events.</h2>';
    return;
  }
  let card = "";
  array.forEach((element) => {
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
        </div>`;
  });

  cardMain.innerHTML = card;
}

function printCardDetail(card) {
  html += `<div class="row g-0">
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
  container.innerHTML = html;
}

// Stats

function currentDate(object) {
  let currentDateString = object.currentDate;
  let currentDate = new Date(currentDateString);
  return currentDate;
}

function pastEvents(objet, data) {
  for (event of objet) {
    let eventDateString = event.date;
    let eventDate = new Date(eventDateString);
    (eventDate < currentDate(data)) ? eventsPast.push(event) : eventsUpcoming.push(event);
    }
  
  categoriesFilter(eventsPast, "past");
  categoriesFilter(eventsUpcoming, "upcoming");
}

function categoriesFilter(objet, time) {
  let categories = [];
  objet.map((event) => (!categories.includes(event.category)) ? categories.push(event.category) : null);
  time == "past" ? (tablePastEvents = categories) : (tableUpcomingEvents = categories);
}

function revenues(array, category, tiempo) {
  let revenues = 0, sum = 0, counter = 0;
  for (event of array) {
    if (event.category == category) {
      counter++;
      revenues += (event.assistance ? event.assistance : event.estimate) * event.price;
      sum += parseFloat((
          ((event.assistance ? event.assistance : event.estimate) * 100) / event.capacity).toFixed(2)
      );
    }
  }
  
  sum = parseFloat(sum / counter).toFixed(2);

  if (tiempo == "past") {
    table_2and3(table3, category, revenues, sum);
  } else {
    table_2and3(table2, category, revenues, sum);
  }
}

function table_1(event) {
  table1.innerHTML = `
      <tr>
        <td> ${event.majorEventByAttendance} </td>
        <td> ${event.minorEventByAttendance}</td>
        <td> ${event.largestCapacityEvent} </td>
      </tr>`;
}

function table_2and3(table, category, revenues, sum) {
  let row = document.createElement("tr");
  row.innerHTML = `
      <td>${category}</td>
      <td>$${new Intl.NumberFormat('es-US').format(revenues)}</td>
      <td>${sum}%</td>`;
  table.appendChild(row);
}

function percentageAttendanceAndCapacity(array) {
  let table1 = {};
  let majorEventByAttendance = ""; minorEventByAttendance = ""; largestCapacityEvent = "";
  let higherPercentage = 0; minorPercentage = 100; capacity = 0;

  for (event of array) {
    // Events with the minor and highest percentage of attendance
    let auxPercentage = ((event.assistance * 100) / event.capacity).toFixed(2);
    if (auxPercentage > higherPercentage) {
      higherPercentage = auxPercentage;
      majorEventByAttendance = event.name;
    } else if (auxPercentage < minorPercentage) {
      minorPercentage = auxPercentage;
      minorEventByAttendance = event.name;
    }

    let auxCapacity = event.capacity;
    //Event with larger capacity
    if (auxCapacity > capacity) {
      capacity = auxCapacity;
      largestCapacityEvent = event.name;
    }
  }

  table1.majorEventByAttendance = `${majorEventByAttendance} (${higherPercentage}%)`;
  table1.minorEventByAttendance = `${minorEventByAttendance} (${minorPercentage}%)`;
  table1.largestCapacityEvent = `${largestCapacityEvent} (${capacity})`;
  table_1(table1);
}