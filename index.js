document.addEventListener('DOMContentLoaded', () => {

    fetch('https://api.openbrewerydb.org/v1/breweries')
        .then((response) => response.json())
        .then((data) => data.forEach(breweryInfo => renderBreweryInformation(breweryInfo)))

    function renderBreweryInformation(breweryInfo) {
        console.log(breweryInfo)
        const container = document.querySelector('#brewery-info-container')
        const li = document.createElement('li')
        li.textContent = breweryInfo.name
        const a = document.createElement('a')
        a.textContent = breweryInfo.website_url
        a.href = breweryInfo.website_url
        const p = document.createElement('p')
        p.textContent = `${breweryInfo.city}, ${breweryInfo.state}       / type: ${breweryInfo.brewery_type}`
        container.append(li, a, p)
        a.addEventListener('mouseover', highlightHoverURL)
        a.addEventListener('mouseout', unhighlightHoverURL)
        function highlightHoverURL(event) {
            a.style.backgroundColor = 'yellow';
        }
        function unhighlightHoverURL(event) {
            a.style.backgroundColor = '';
        }
    }

    const form = document.querySelector('#brewery-city-search-form')
    form.addEventListener('submit', searchCityBrewery)

    function searchCityBrewery(event) {
        event.preventDefault();
        const searchCity = document.querySelector('#search')
        console.log(searchCity.value)
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${searchCity.value}`)
            .then(response => response.json())
            .then(data => data.forEach(brewerySearch => {
                console.log(brewerySearch)
                const li = document.createElement('li')
                li.textContent = brewerySearch.name
                const breweryContainer = document.querySelector('#filtered-brewery-by-city-list')
                const a = document.createElement('a')
                a.textContent = brewerySearch.website_url
                a.href = brewerySearch.website_url
                const p = document.createElement('p')
                p.textContent = brewerySearch.address_1
                breweryContainer.append(li, a, p)
                li.addEventListener('click', changeColor)
                function changeColor(event) {
                    event.target.style.color = "orange"
                } 
            }))

    }
                 // upon submit button do some clearing renderBreweryLIs
                // need to clear the breweryContainer 
                // create a function and invoke to display your 



})