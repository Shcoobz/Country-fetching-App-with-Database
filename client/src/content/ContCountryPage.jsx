import ComTitle from '../components/ComTitle';
import ComSearch from '../components/ComSearch';
import ComBtn from '../components/ComBtn';
import ComRemoveAllFavBtn from '../components/ComRemoveAllFavBtn';
import CardCountrySmall from '../cards/CardCountrySmall';

/**
 * React functional component for rendering the country list page.
 * @param {Object} props - The props for the component.
 * @param {string} props.searchValue - The search value for filtering countries.
 * @param {function} props.setSearchValue - Function to set the search value.
 * @param {string} props.countrySortOrder - The current country sort order ('asc' or 'desc').
 * @param {function} props.onCountrySort - Function to handle country sorting.
 * @param {function} props.onFavoritesBtnClick - Function to handle the click event on the "Favorites" button.
 * @param {Object[]} props.countries - An array of all countries.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {function} props.handleAddRemoveFavToggle - Function to handle adding/removing favorites.
 * @param {function} props.onRemoveAllFavorites - Function to handle the removal of all favorites.
 * @param {function} props.onCountrySelect - Function to handle selecting a country.
 * @param {function} props.filterCountries - Function to filter countries based on search value.
 * @returns {JSX.Element} JSX element representing the country list page.
 */
function ContCountryPage({
  searchValue,
  setSearchValue,
  countrySortOrder,
  onCountrySort,
  onFavoritesBtnClick,
  countries,
  favorites,
  handleAddRemoveFavToggle,
  onRemoveAllFavorites,
  onCountrySelect,
  filterCountries,
}) {
  const filteredCountries = filterCountries(countries, searchValue);

  return (
    <div>
      <ComTitle text='Countries:' />
      <div>
        <ComSearch
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='I like to search it, search it... countries!'
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

        <ComBtn
          text='Favorites'
          onClick={onFavoritesBtnClick}
          className='favorites-btn'
        />

        <ComRemoveAllFavBtn
          favorites={favorites}
          onRemoveAllFavorites={onRemoveAllFavorites}
        />
      </div>
      <div className='container'>
        {filteredCountries.map((country) => (
          <CardCountrySmall
            key={country.name.common}
            country={country}
            favorites={favorites}
            handleAddRemoveFavToggle={handleAddRemoveFavToggle}
            onCountrySelect={() => onCountrySelect(country)}
          />
        ))}
      </div>
    </div>
  );
}

export default ContCountryPage;
