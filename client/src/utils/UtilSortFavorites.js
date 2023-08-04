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
