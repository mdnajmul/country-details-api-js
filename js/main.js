const searchField = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const countryDetailsContainer = document.getElementById('country-details');
const errorField = document.getElementById('error');

searchButton.addEventListener('click', function(){
    
    //clear country container
    countryContainer.innerHTML = '';
    //clear country details container
    countryDetailsContainer.innerHTML = '';
    //clear error field
    errorField.innerHTML = '';

    const searchInputValue = searchField.value;

    if(searchInputValue === ''){
        errorField.innerHTML = `<h1 class="text-center mt-3 text-danger">Please write any country name!</h1>`;
        return;
    }

    const url = `https://restcountries.eu/rest/v2/name/${searchInputValue}`;
    fetch(url)
    .then(res => res.json()
    .then(data => displayCountry(data)))
    .finally(() => searchField.value = '')
});


const displayCountry = countryArray => {
    
    if(countryArray.status === 404){
        errorField.innerHTML = `<h1 class="text-center mt-3 text-danger">No Result Found!</h1>`;
        return;
    }

    countryArray.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <!-- Image -->
            <div class="rounded overflow-hidden border p-2">
                <img src="${country.flag}" class="w-100" alt=""/>
            </div>
            <!-- Body -->
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
                <h1>${country.name}</h1>
                <button onclick="showCountryDetails('${country.alpha3Code}')" class="btn btn-dark">Learn More</button>
            </div>
        `;
        countryContainer.appendChild(div);
    });
};


const showCountryDetails = (alpha3Code) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        countryDetailsContainer.innerHTML = `
            <h1 class="text-center text-success fw-bold">${data.altSpellings[1]}(${data.name})</h1>
            <div class="row mt-3">
                <div class="col-md-4">
                    <p><strong>Capital:</strong> ${data.capital}</p>
                    <p><strong>Population:</strong> ${Intl.NumberFormat().format(data.population)}</p>
                    <p><strong>Area:</strong> ${Intl.NumberFormat().format(data.area)}</p>
                </div>
                <div class="col-md-4">
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Official Language:</strong> ${data.languages[0].name}</p>
                    <p><strong>Currency Name:</strong> ${data.currencies[0].name}</p>
                </div>
                <div class="col-md-4">
                    <p><strong>Currency Symbol:</strong> ${data.currencies[0].symbol}</p>
                    <p><strong>Phone Code:</strong> ${data.callingCodes[0]}</p>
                    <p><strong>Timezone:</strong> ${data.timezones[0]}</p>
                </div>
            </div>
        `;
    });
}; 