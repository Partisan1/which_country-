let countries = [];
let currentCountry = {};

function fetchCountries() {
    const url = "https://restcountries.com/v3.1/region/europe"; 
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Page not found. >:3");
        }
        return response.json();
    })
    .then(data => {
        countries = data;
        renderCountries(countries);  
    })
    .catch(error => console.log(error));
}

const gridContainer = document.getElementById('grid-container');
const rows = 6;
const columns = 9;
const totalItems = rows * columns;

function renderCountries(countries) {
    const countriesToDisplay = countries.slice(0, totalItems);
    
    countriesToDisplay.forEach(country => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        const flagUrl = country.flags.svg; 
        const flagImage = document.createElement('img');
        flagImage.src = flagUrl;
        flagImage.alt = `${country.name.common} zászló`;
        
        gridItem.addEventListener('click', () => checkAnswer(country));
        
        gridItem.appendChild(flagImage);
        gridContainer.appendChild(gridItem);
    });
}

function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];
    document.getElementById("texting").value = currentCountry.name.common;  
}

function checkAnswer(selectedCountry) {
    if (selectedCountry.name.common === currentCountry.name.common) {
        alert("Helyes válasz!");
        getRandomCountry()
    } else {
        alert("Helytelen válasz. Próbáld újra!");
    }
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    getRandomCountry();
});


fetchCountries();
