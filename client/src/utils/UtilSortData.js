/**
 * Represents a utility function for sorting an array of data in ascending or descending order.
 * @function UtilSortData
 * @param {Array} data - An array of data to be sorted.
 * @param {string} sortOrder - The sort order, either 'asc' (ascending) or 'desc' (descending).
 * @returns {Array} An array of sorted data.
 */
function UtilSortData(data, sortOrder) {
  return [...data].sort((a, b) => {
    const nameA = a.name.common.toUpperCase();
    const nameB = b.name.common.toUpperCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else if (sortOrder === 'desc') {
      return nameB.localeCompare(nameA);
    }

    return 0;
  });
}

export default UtilSortData;
