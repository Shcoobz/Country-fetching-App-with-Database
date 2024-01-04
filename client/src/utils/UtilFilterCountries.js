/**
 * Represents a utility function for filtering an array of countries based on a search value.
 * @function UtilFilterCountries
 * @param {Array} countries - An array of country data to filter.
 * @param {string} searchValue - The search value to filter countries by.
 * @returns {Array} An array of filtered country data.
 */
function UtilFilterCountries(countries, searchValue) {
  const filteredCountries = countries.filter(
    (country) =>
      country &&
      country.name &&
      country.name.common &&
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredCountries;
}

export default UtilFilterCountries;
