/**
 * Represents a utility function for fetching countries data from an external API.
 * @async
 * @function UtilFetchCountries
 * @returns {Promise<Array>} An array of country data.
 * @throws {Error} Throws an error if there is an issue fetching the data.
 */
async function UtilFetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching countries:', err);
    return [];
  }
}

export default UtilFetchCountries;
