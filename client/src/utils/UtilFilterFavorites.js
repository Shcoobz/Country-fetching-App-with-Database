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
