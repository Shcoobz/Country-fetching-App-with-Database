import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import ComSearch from '../components/ComSearch';
import ComRemoveAllFavBtn from '../components/ComRemoveAllFavBtn';
import CardFavoritePage from '../cards/CardFavoritePage';

/**
 * React functional component for rendering the favorites page.
 * @param {Object} props - The props for the component.
 * @param {string} props.countrySortOrder - The current country sort order ('asc' or 'desc').
 * @param {function} props.onCountrySort - Function to handle country sorting.
 * @param {function} props.onBackBtnClick - Function to handle the click event on the "Back" button.
 * @param {string} props.favoriteSearchValue - The search value for filtering favorite countries.
 * @param {function} props.onFavoritesSearchInput - Function to handle input change for favorites search.
 * @param {function} props.handleAddRemoveFavToggle - Function to handle adding/removing favorites.
 * @param {function} props.onRemoveAllFavorites - Function to handle the removal of all favorites.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {function} props.onCountrySelect - Function to handle selecting a country.
 * @returns {JSX.Element} JSX element representing the favorites page.
 */
function ContFavoritesPage({
  countrySortOrder,
  onCountrySort,
  onBackBtnClick,
  favoriteSearchValue,
  onFavoritesSearchInput,
  handleAddRemoveFavToggle,
  onRemoveAllFavorites,
  favorites,
  onCountrySelect,
}) {
  return (
    <div>
      <ComTitle text='Favorite Countries:' />
      <div>
        <ComSearch
          value={favoriteSearchValue}
          onChange={onFavoritesSearchInput}
          placeholder='I like to search it, search it ... even more ... favorites!'
        />
      </div>
      <div className='btn-container'>
        <ComBtn
          text={`Sort: ${countrySortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          onClick={onCountrySort}
          className='sort-btn'
          iconClassName=''
          icon={null}
          tooltip={false}
        />

        <ComRemoveAllFavBtn
          favorites={favorites}
          onRemoveAllFavorites={onRemoveAllFavorites}
        />

        <ComBtn text='Back' onClick={onBackBtnClick} className='back-btn' />
      </div>
      <div>
        {favorites.length > 0 ? (
          <div className='container'>
            <CardFavoritePage
              favorites={favorites}
              handleAddRemoveFavToggle={handleAddRemoveFavToggle}
              onCountrySelect={onCountrySelect}
              favoriteSearchValue={favoriteSearchValue}
            />
          </div>
        ) : (
          <div>
            <p>Nothing here, mate.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContFavoritesPage;
