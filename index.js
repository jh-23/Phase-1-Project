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
        p.textContent = `${breweryInfo.city}, ${breweryInfo.state}        type: ${breweryInfo.brewery_type}`
        container.append(li, a, p)
    }







})