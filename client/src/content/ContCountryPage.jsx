import ComTitle from '../components/ComTitle';
import ComSearch from '../components/ComSearch';
import ComBtn from '../components/ComBtn';
import ComRemoveAllFavBtn from '../components/ComRemoveAllFavBtn';

import CardCountrySmall from '../cards/CardCountrySmall';

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

  console.log('filteredCountries:', filteredCountries.length);

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
          text={`Sort: ${
            countrySortOrder === 'asc' ? 'Ascending' : 'Descending'
          }`}
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
