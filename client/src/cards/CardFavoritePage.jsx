import CardCountrySmall from './CardCountrySmall';
import UtilFilterFavorites from '../utils/UtilFilterFavorites';

function CardFavoritePage({
  favorites,
  favoriteSearchValue,
  handleAddRemoveFavToggle,
  onCountrySelect,
}) {
  function updateCountryObjectsWithFavorites() {
    return favorites.map((country, index) => {
      const isFavorite = favorites.some(
        (fav) => fav.country === country.country
      );

      const id = country.id || index;

      return { ...country, isFavorite, id };
    });
  }

  function renderFavoriteCountryCards() {
    const updatedFavorites = updateCountryObjectsWithFavorites();
    const filteredFavorites = UtilFilterFavorites(
      updatedFavorites,
      favoriteSearchValue
    );

    return filteredFavorites.map((country) => (
      <CardCountrySmall
        key={country.country}
        country={country}
        favorites={updatedFavorites}
        handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        onCountrySelect={() => onCountrySelect(country)}
        className={country.isHighestPopulation ? 'highest-population' : ''}
      />
    ));
  }

  return <>{renderFavoriteCountryCards()}</>;
}

export default CardFavoritePage;
