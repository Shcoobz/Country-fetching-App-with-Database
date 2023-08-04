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
