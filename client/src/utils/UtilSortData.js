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
