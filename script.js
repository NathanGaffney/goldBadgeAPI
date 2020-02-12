const baseURL = 'https://api.opencagedata.com/geocode/v1/json?q='
const key = "3d602833b66f49b997d33e7dfa0bf7cb" // personal key
let url;
let markText;

// SEARCH FORM
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const table = document.querySelector('table');
// const places = document.querySelector('h3');

// RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
// RESULTS SECTION
const section = document.querySelector('section');

// places.style.display = 'none';
nav.style.display = 'none';



searchForm.addEventListener('submit', fetchResults);

// function addButton(e) {
//     e.preventDefault();
//     console.log('test');
//     let buttonHome = document.createElement('p');
//     let button = document.createElement('button');
//     button.innerHTML = searchTerm.value;
//     buttonHome.appendChild(button);
//     history.appendChild(buttonHome);
// }
var rowId = 1;

function addData(latlng) {
    let tableRow = document.createElement('tr');
    let tableData = document.createElement('td');
    let tableLat = document.createElement('td');
    let tableLng = document.createElement('td');
    tableData.innerHTML = searchTerm.value;
    tableRow.appendChild(tableData);
    tableLat.innerHTML = latlng.lat;
    tableLng.innerHTML = latlng.lng;
    tableRow.appendChild(tableLat);
    tableRow.appendChild(tableLng);
    table.appendChild(tableRow);
    tableRow.setAttribute('onClick', 'tableData('+ rowId+')');
    tableRow.setAttribute('id', 'row-'+ rowId);
    rowId++;
}

function tableData(x) {
    let row = document.getElementById('row-'+ x);
    // row.setAttribute('class', 'clickMe');
    let lat = row.cells[1].innerText;
    let lng = row.cells[2].innerText;
    let latlng = {
        lat: lat,
        lng: lng
    }
    
    history(latlng);
}

// FETCH LOGIC
function fetchResults(e) {
    e.preventDefault(); 
    // Assemble the full URL
    url = baseURL + searchTerm.value + '&key=' + key
    
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        markText = jsonData.results[0].formatted;
        console.log(markText)
        console.log(jsonData.results);
        data = jsonData.results[0].geometry
        console.log(data);
        setView(data);
        addData(data, markText);
    })
    .catch(function(err) {
        // alert('No Results Found')
        console.error(err);
        let para = document.createElement('p');
        para.innerText = 'No Results Found'; //@@@@@@@@@@@@@@@@@@@@@
        searchForm.appendChild(para);


    })
}
