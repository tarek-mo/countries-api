// Theme Toggle 

const themeButton = document.querySelector('header button');

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark')
});

// Dropdown Control

const dropdownBtn = document.querySelector('.dropdown button')
const regionsFilter = document.querySelectorAll('.region-name')


dropdownBtn.addEventListener('click', (e) => {
    dropdownBtn.parentElement.classList.toggle('clicked')
    
});





// Load Countries
loadCountries()
async function loadCountries() {
    const request = await fetch(`https://restcountries.eu/rest/v2/all
    `)
    const countries = await request.json()
    
    displayCountries(countries);
    searchAbility();
    filterByRegion();
    
    
}

function displayCountries(countries) {
    const countriesDOM = document.querySelector('.countries')

    // Hides 'countries Loading'
    const loadingMsg = countriesDOM.querySelector('h2');
    loadingMsg.style.display = 'none'


    countries.forEach(country => {
        const {name, capital, region, population, flag} = country;

        const countryDOM = document.createElement('div');
        countryDOM.classList.add('card');
        countryDOM.innerHTML = `
        <img src="${flag}" alt="Country Flag" />
          <div class="country-body">
            <h3 class="country-name">${name}</h3>
            <p><span>Population</span>: ${population}</p>
            <p class="region"><span>Region</span>: ${region}</p>
            <p><span>Capital</span>: ${capital}</p>
          </div>
        `
        countriesDOM.append(countryDOM);
        
        countryDOM.addEventListener('click', () => {
            const countryDetailsDOM = document.querySelector('.details');
            const overlay = document.querySelector('.overlay')
            overlay.classList.toggle('show')
            countryDetailsDOM.classList.add('show')

            showCountryDetails(country, countryDetailsDOM)
            const closeDetails = document.querySelector('.close')
            closeDetails.addEventListener('click', () => {
                countryDetailsDOM.classList.remove('show')
                overlay.classList.remove('show')
            })
        })


        
        
    })
};



// Country Details On Click 
function showCountryDetails(country, countryDetailsDOM) {
    
    let currenciesDOM = '';
    let languagesDOM = '';
    const {subregion, languages, nativeName, population, name, capital, region, currencies, topLevelDomain, flag} = country
    currencies.map(currency => {
        currenciesDOM += ' ' + currency.name
    })

    languages.map(language => {
        
        languagesDOM += ' ' + language.name + ','
    })


    countryDetailsDOM.innerHTML = `
    <div class='container'>
        <i class="close fas fa-times"></i>
        <div class="img-container">
            <img src="${flag}" alt="Country Flag" />
        </div>
        <div class="details-body">
            <div class="flex-item">
                <h2>${name}</h2>
                <p><span>Native Name</span>: ${nativeName}</p>
                <p><span>Population</span>: ${population}</p>
                <p><span>Region</span>: ${region}</p>
                <p><span>Sub Region</span>: ${subregion}</p>
                <p><span>Capital</span>: ${capital}</p>
            </div>
            <div class="flex-item">
                <p><span>Top Level Domain</span>: ${topLevelDomain[0]}</p>
                <p><span>Currencies</span>: ${currenciesDOM}</p>
                <p><span>Languages</span>: ${languagesDOM}</p>
            </div>
        </div>
    </div>
    `
    
}


// Search For Country In Input
function searchAbility() {
    
    const searchForCountry = document.querySelector('.search-country');
    const countryNamesDOM = document.querySelectorAll('.country-name');
    searchForCountry.addEventListener('input', () => {
        const {value} = searchForCountry;
        countryNamesDOM.forEach(name => {
            if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
                name.parentElement.parentElement.style.display = 'block'
            } else {
                name.parentElement.parentElement.style.display = 'none'

            }
        })
    })
}


// Filter Countries by Region
function filterByRegion() {
    
    const regions = document.querySelectorAll('.region')
    regionsFilter.forEach(filter => {
        filter.addEventListener('click', () => {
            regions.forEach(region => {
                
                if (region.innerText.includes(filter.innerText) || filter.innerText === 'All') {
                   region.parentElement.parentElement.style.display = 'block';
            
                } else {
                    region.parentElement.parentElement.style.display = 'none'
                }
            })

            

        })
    })
}

