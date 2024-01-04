import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ComBtn from '../components/ComBtn';

/**
 * React functional component for rendering a small country card.
 * @param {Object} props - The props for the component.
 * @param {Object} props.country - The country object with details.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {function} props.handleAddRemoveFavToggle - Function to toggle favorites.
 * @param {function} props.onCountrySelect - Function to handle country selection.
 * @returns {JSX.Element} JSX element representing the small country card.
 */
function CardCountrySmall({
  country,
  favorites,
  handleAddRemoveFavToggle,
  onCountrySelect,
}) {
  const isFavorite = checkIfFavorite();

  /**
   * Checks if the current country is marked as a favorite.
   * @returns {boolean} True if the country is a favorite, false otherwise.
   */
  function checkIfFavorite() {
    return favorites.some((fav) => fav.name.common === country.name.common);
  }

  return (
    <div className='country'>
      <div className='country-name-container'>
        <h2 className='country-name'>{country.name.common}</h2>
        <ComBtn
          onClick={() => handleAddRemoveFavToggle(country)}
          icon={isFavorite ? solidHeart : regularHeart}
          iconClassName={isFavorite ? 'solidHeart' : 'regularHeart'}
          className={`fav-btn-card-small ${isFavorite ? 'solidHeart' : 'regularHeart'}`}
          tooltip={true}
        />
      </div>
      <hr className='rounded-country' />
      <ComBtn
        text='Learn More'
        onClick={() => onCountrySelect(country)}
        className='learn-more-btn'
      />
    </div>
  );
}

export default CardCountrySmall;
