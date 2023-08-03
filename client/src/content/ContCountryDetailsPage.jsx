import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import ComRemoveAllFavBtn from '../components/ComRemoveAllFavBtn';

import CardCountryDetails from '../cards/CardCountryDetails';

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
