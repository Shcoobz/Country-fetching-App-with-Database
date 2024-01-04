import CardCountrySmall from './CardCountrySmall';
import UtilFilterCountries from '../utils/UtilFilterCountries';

/**
 * React functional component for rendering favorite country cards on a page.
 * @param {Object} props - The props for the component.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {string} props.favoriteSearchValue - The search value for filtering favorites.
 * @param {function} props.handleAddRemoveFavToggle - Function to toggle favorites.
 * @param {function} props.onCountrySelect - Function to handle country selection.
 * @returns {JSX.Element} JSX element representing the favorite country cards.
 */
function CardFavoritePage({
  favorites,
  favoriteSearchValue,
  handleAddRemoveFavToggle,
  onCountrySelect,
}) {
  /**
   * Updates country objects with favorite status and unique IDs.
   * @returns {Object[]} An array of updated country objects.
   */
  function updateCountryObjectsWithFavorites() {
    return favorites.map((country, index) => {
      const isFavorite = favorites.some((fav) => fav.name.common === country.name.common);

      const id = country.id || index;

      return { ...country, isFavorite, id };
    });
  }

  /**
   * Renders favorite country cards based on search and favorite status.
   * @returns {JSX.Element[]} An array of JSX elements representing favorite country cards.
   */
  function renderFavoriteCountryCards() {
    const updatedFavorites = updateCountryObjectsWithFavorites();
    const filteredFavorites = UtilFilterCountries(updatedFavorites, favoriteSearchValue);

    return filteredFavorites.map((country) => (
      <CardCountrySmall
        key={country.name.common}
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
