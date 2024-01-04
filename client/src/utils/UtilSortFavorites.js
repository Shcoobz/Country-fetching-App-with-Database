/**
 * Represents a utility function for sorting an array of favorite countries in ascending or descending order.
 * @function UtilSortFavorites
 * @param {Array} data - An array of favorite country data to be sorted.
 * @param {string} sortOrder - The sort order, either 'asc' (ascending) or 'desc' (descending).
 * @returns {Array} An array of sorted favorite country data.
 */
function UtilSortFavorites(data, sortOrder) {
  return [...data].sort((a, b) => {
    const nameA = a.country.toUpperCase();
    const nameB = b.country.toUpperCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else if (sortOrder === 'desc') {
      return nameB.localeCompare(nameA);
    }

    return 0;
  });
}

export default UtilSortFavorites;
