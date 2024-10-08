document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get('country');

    let countries = [];

    if (countryName) {
        fetchCountryDetails(countryName);
    }

    async function fetchCountryDetails(countryName) {
        try {
            for (let i = 0; i < 40; i++) {
                const response = await fetch(`http://localhost:3000/${i}`);
                const data = await response.json();
                countries.push(data);
            }

            // Después de cargar todos los países, filtramos el país seleccionado
            const selectedCountry = countries.find(country => country.name === countryName);

            if (selectedCountry) {
                displayCountryDetails(selectedCountry);
            } else {
                console.log("Country not found");
            }

        } catch (error) {
            console.log(error);
        }
    }

    function displayCountryDetails(country) {
        const countryDiv = document.querySelector(".countryDetails");
        countryDiv.querySelector("h1").innerText = country.name;
        countryDiv.querySelector("img").src = country.flags.png;
        countryDiv.querySelector("#population").innerText = country.population;
        countryDiv.querySelector("#region").innerText = country.region;
        countryDiv.querySelector("#capital").innerText = country.capital;
    }
    
});
