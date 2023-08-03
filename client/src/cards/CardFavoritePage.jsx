import CardCountrySmall from './CardCountrySmall';
import UtilFilterCountries from '../utils/UtilFilterCountries';

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
    const filteredFavorites = UtilFilterCountries(
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
      />
    ));
  }

  return <>{renderFavoriteCountryCards()}</>;
}

export default CardFavoritePage;
