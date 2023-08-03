function UtilFilterCountries(countries, searchValue) {
  console.log('countries:', countries);
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
