import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ComBtn from '../components/ComBtn';

function CountryInfoItem({ label, value }) {
  return (
    <div className='info-item'>
      <p className='info-label'>{label}</p>
      <p className='info-value'>{value}</p>
    </div>
  );
}

function CardCountryDetails({ country, favorites, handleAddRemoveFavToggle }) {
  const isFavorite = checkIfFavorite();

  function checkIfFavorite() {
    return favorites.some(
      (fav) =>
        fav.country === (country.name ? country.name.common : country.country)
    );
  }

  return (
    <div>
      <div className='country-container'>
        <div className='details-title'>
          <h2> {country.name ? country.name.common : country.country}</h2>
          <ComBtn
            onClick={() => handleAddRemoveFavToggle(country)}
            icon={isFavorite ? solidHeart : regularHeart}
            iconClassName={isFavorite ? 'solidHeart' : 'regularHeart'}
            className={`fav-btn-card-details ${
              isFavorite ? 'solidHeart' : 'regularHeart'
            }`}
            tooltip={true}
          />
        </div>
        <hr className='rounded-top' />
        <div className='flag'>
          {country?.flags?.svg ? (
            <img src={country.flags.svg} alt='flag' />
          ) : (
            <p>No info</p>
          )}
        </div>
        <hr className='rounded-bottom' />
        <div className='country-info'>
          <CountryInfoItem
            label='Official Name:'
            value={
              country.name ? country.name.official || 'No info' : 'No info'
            }
          />
          <CountryInfoItem
            label='Region:'
            value={country.region || 'No info'}
          />
          <CountryInfoItem
            label='Sub Region:'
            value={country.subregion || 'No info'}
          />
          <CountryInfoItem
            label='Capital:'
            value={(country.capital && country.capital[0]) || 'No info'}
          />
          <CountryInfoItem
            label='Area:'
            value={country.area ? country.area + ' sq km' : 'No info'}
          />
          <CountryInfoItem
            label='Population:'
            value={country.population || 'No info'}
          />
          <CountryInfoItem
            label='Currency:'
            value={
              (country.currencies &&
                Object.values(country.currencies)[0].name) ||
              'No info'
            }
          />
          <CountryInfoItem
            label='Timezones:'
            value={
              (country.timezones && country.timezones.join(', ')) || 'No info'
            }
          />
          <CountryInfoItem
            label='Continent:'
            value={(country.continents && country.continents[0]) || 'No info'}
          />
        </div>
      </div>
    </div>
  );
}

export default CardCountryDetails;
