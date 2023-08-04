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
    return favorites.some((fav) => fav.country === country.name.common);
  }

  return (
    <div>
      <div className='country-container'>
        <div className='details-title'>
          <h2>{country.name.common}</h2>
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
          <img src={country.flags.svg} alt='flag' />
        </div>
        <hr className='rounded-bottom' />
        <div className='country-info'>
          <CountryInfoItem
            label='Official Name:'
            value={country.name.official}
          />
          <CountryInfoItem label='Region:' value={country.region} />
          <CountryInfoItem label='Sub Region:' value={country.subregion} />
          <CountryInfoItem
            label='Capital:'
            value={country.capital && country.capital[0]}
          />
          <CountryInfoItem label='Area:' value={country.area + ' sq km'} />
          <CountryInfoItem label='Population:' value={country.population} />
          <CountryInfoItem
            label='Currency:'
            value={Object.values(country.currencies)[0].name}
          />
          <CountryInfoItem
            label='Timezones:'
            value={country.timezones && country.timezones.join(', ')}
          />
          <CountryInfoItem label='Continent:' value={country.continents[0]} />
        </div>
      </div>
    </div>
  );
}

export default CardCountryDetails;
