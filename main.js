document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchInput");
  const searchRegionSelect = document.querySelector(".searchRegionSelect");

  searchInput.addEventListener("input", searchCountry);
  searchRegionSelect.addEventListener("change", searchCountryByRegion);

  class CountryHandler {
    constructor() {
      this.countries = [];
      this.fetchCountries();
    }

    async fetchCountries() {
      try {
        for (let i = 0; i < 40; i++) {
          const data = await fetch(`http://localhost:3000/${i}`);
          const country = await data.json();
          this.countries.push(country);
        }

        displayCountries(this.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
  }

  const countryInstance = new CountryHandler();

  function displayCountries(countries) {
    const countriesContainer = document.querySelector(".countriesDiv");
    countriesContainer.innerHTML = ''; // Clear the container

    countries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.innerHTML = `
        <div class="bg-white rounded-md overflow-hidden max-w-max cursor-pointer">
          <img class="w-96 h-1/2 object-cover" src="${country.flags.png}" alt="Flag of ${country.name}">
          <div class="p-4">
            <p class="font-bold text-xl">${country.name}</p>
            <div class="mt-4 space-y-2">
              <p class="font-medium">Population: <span class="font-light">${country.population}</span></p>
              <p class="font-medium">Region: <span class="font-light">${country.region}</span></p>
              <p class="font-medium">Capital: <span class="font-light">${country.capital}</span></p>
            </div>
          </div>
        </div>
      `;

      countryCard.onclick = () => navigateToCountry(country);
      countriesContainer.appendChild(countryCard);
    });
  }

  function searchCountry(e) {
    const query = e.target.value.toLowerCase();
    const filteredCountries = countryInstance.countries.filter(country => country.name.toLowerCase().includes(query));

    displayCountries(filteredCountries);
  }

  function searchCountryByRegion(e) {
    const region = e.target.value.toLowerCase();
    const filteredCountries = countryInstance.countries.filter(country => country.region.toLowerCase().includes(region));

    displayCountries(filteredCountries);
  }

  function navigateToCountry(country) {
    window.location.href = `country.html?country=${country.name}`;
  }
});
