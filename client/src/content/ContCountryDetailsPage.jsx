import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import ComRemoveAllFavBtn from '../components/ComRemoveAllFavBtn';

import CardCountryDetails from '../cards/CardCountryDetails';

/**
 * React functional component for rendering the country details page.
 * @param {Object} props - The props for the component.
 * @param {function} props.onFavoritesBtnClick - Function to handle the click event on the "Favorites" button.
 * @param {function} props.onBackBtnClick - Function to handle the click event on the "Back" button.
 * @param {Object} props.selectedCountry - The currently selected country object to display details.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {function} props.handleAddRemoveFavToggle - Function to handle adding/removing favorites.
 * @param {function} props.onRemoveAllFavorites - Function to handle the removal of all favorites.
 * @returns {JSX.Element} JSX element representing the country details page.
 */
function ContCountryDetailsPage({
  onFavoritesBtnClick,
  onBackBtnClick,
  selectedCountry,
  favorites,
  handleAddRemoveFavToggle,
  onRemoveAllFavorites,
}) {
  return (
    <div>
      <ComTitle text='Details:' />
      <div className='btn-container'>
        <ComBtn
          text='Favorites'
          onClick={onFavoritesBtnClick}
          className='favorites-btn'
        />

        <ComRemoveAllFavBtn
          favorites={favorites}
          onRemoveAllFavorites={onRemoveAllFavorites}
        />

        <ComBtn text='Back' onClick={onBackBtnClick} className='back-btn' />
      </div>
      <div>
        <CardCountryDetails
          country={selectedCountry}
          onBack={onBackBtnClick}
          favorites={favorites}
          handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        />
      </div>
    </div>
  );
}

export default ContCountryDetailsPage;
