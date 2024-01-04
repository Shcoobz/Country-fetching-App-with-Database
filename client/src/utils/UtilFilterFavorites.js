/**
 * Represents a utility function for filtering an array of favorite countries based on a search value.
 * @function UtilFilterFavorites
 * @param {Array} favorites - An array of favorite country data to filter.
 * @param {string} searchValue - The search value to filter favorites by.
 * @returns {Array} An array of filtered favorite country data.
 */
function UtilFilterFavorites(favorites, searchValue) {
  const filteredFavorites = favorites.filter(
    (favorite) =>
      favorite &&
      favorite.country &&
      favorite.country.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredFavorites;
}

export default UtilFilterFavorites;
