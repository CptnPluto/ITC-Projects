const firstMap = document.getElementById("map").getAttribute("src")
let map = firstMap;
// console.log(map);

let cities = ["Cleveland,%20OH", "Silver%20Spring,%20MD", "Baltimore,%20MD", "San%20Jose,%20CA", "Manhattan,%20NY", "Modi'in,%20Israel"];
let citiesIndex = 0;

let next = document.getElementById("next");
let previous = document.getElementById("previous");

next.addEventListener("click", ()=> { updateMap("next")});
previous.addEventListener("click", ()=> { updateMap("previous")});

function updateButtons() {
    if (citiesIndex >= (cities.length - 1)) {
        next.disabled = true;
    } else {
        next.disabled = false;
    }

    if (citiesIndex > 0) {
        previous.disabled = false;
    } else {
        previous.disabled = true;
    }
}

// function goNext() {
//     let currentCity = cities[citiesIndex];

//     let nextCity = cities[citiesIndex+1];
//     newMap = map.replace(currentCity, nextCity);
//     document.getElementById("map").src = newMap;
//     map=newMap;
    
//     updateButtons(citiesIndex++);
// }

// function goPrevious() {
//     let currentCity = cities[citiesIndex];
//     let nextCity = cities[citiesIndex-1];
//     newMap = map.replace(currentCity, nextCity);
//     document.getElementById("map").src = newMap;
//     map=newMap;

//     updateButtons(citiesIndex--);
// }

function updateMap(direction) {
    const currentCity = cities[citiesIndex];
    let newIndex;
    if (direction == "next") {
        newIndex = ++citiesIndex
    } else {
        newIndex = --citiesIndex
    };
    const nextCity = cities[newIndex];
    newMap = map.replace(currentCity, nextCity);
    document.getElementById("map").src = newMap;
    map=newMap;
    updateButtons(newIndex);
}