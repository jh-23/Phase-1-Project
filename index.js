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
        p.textContent = `${breweryInfo.city}, ${breweryInfo.state} / type: ${breweryInfo.brewery_type}`
        container.append(li, a, p)
        a.addEventListener('mouseover', highlightHoverURL)
        a.addEventListener('mouseout', unhighlightHoverURL)
        function highlightHoverURL(event) {
            a.style.backgroundColor = 'yellow';
        }
        function unhighlightHoverURL(event) {
            a.style.backgroundColor = '';
        }
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild)
            }
        }
        const remover = document.querySelector('#brewery-info-container')
        removeAllChildNodes(remover);
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
                let card = document.createElement('li')
                card.className = 'card'
                card.innerHTML = `
                <div class="content">
                    <h4>${brewerySearch.name}</h4>
                    <a href=${brewerySearch.website_url}>${brewerySearch.website_url}</a>
                    <p>Address: ${brewerySearch.address_1}</p>
                    <p>Brewery Type: ${brewerySearch.brewery_type}</p>
                </div>
                `
                const breweryContainer = document.querySelector('#filtered-brewery-by-city-list')
                breweryContainer.append(card)
                
                card.addEventListener('click', changeColor)
                function changeColor(event) {
                    event.target.style.color = "orange"
                } 
                card.addEventListener('mouseover', highlightHoverURL)
                card.addEventListener('mouseout', unhighlightHoverURL)
                function highlightHoverURL(event) {
                    card.style.backgroundColor = 'red';
                }
                function unhighlightHoverURL(event) {
                    card.style.backgroundColor = '';
                }
            }))

    }
                const cityEntry = document.querySelector('#search')
                cityEntry.addEventListener("focus", createFocusEvent)

                function createFocusEvent(event) {
                    event.target.style.background = "orange";
                }
})