// TODO: CardCountryDetails check with country name && fetch on btn click details for fav country from api

import { useState, useEffect } from 'react';
import './App.css';

import ContCountryPage from './content/ContCountryPage';
import ContCountryDetailsPage from './content/ContCountryDetailsPage';
import ContFavoritesPage from './content/ContFavoritesPage';

import UtilFilterCountries from './utils/UtilFilterCountries';
import UtilFetchCountries from './utils/UtilFetchCountries';
import UtilSortData from './utils/UtilSortData';
import UtilSortFavorites from './utils/UtilSortFavorites';

/**
 * Main application component for [Project Name].
 *
 * @function App
 *
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [countries, setCountries] = useState([]);
  const [favoriteSearchValue, setFavoriteSearchValue] = useState('');

  /**
   * CSS class name based on whether the country details are expanded or not.
   *
   * @constant {string}
   */
  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

  // fetches and sorts countries
  useEffect(() => {
    async function getCountries() {
      const fetchedCountries = await UtilFetchCountries();
      const sortedCountries = UtilSortData(fetchedCountries, countrySortOrder);
      setCountries(sortedCountries);
    }

    /**
     * Fetches and sorts the list of countries from an external API.
     *
     * @async
     * @function getCountries
     *
     * @throws {Error} Throws an error if there is an issue fetching the data.
     */
    getCountries();

    fetch('http://localhost:5000/favorites')
      .then((response) => response.json())
      .then((fetchedFavorites) => {
        const sortedFavorites = UtilSortFavorites(fetchedFavorites, countrySortOrder);
        setFavorites(sortedFavorites);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, [countrySortOrder]);

  /**
   * Fetches the country with the highest population from the API.
   *
   * @function fetchHighestPopulation
   *
   * @throws {Error} Throws an error if there is an issue fetching the data.
   */
  function fetchHighestPopulation() {
    fetch('http://localhost:5000/favorites/highestPopulation')
      .then((response) => response.json())
      .then((highestPopulationCountry) => {
        if (highestPopulationCountry.length > 0) {
          setFavorites([{ ...highestPopulationCountry[0], isHighestPopulation: true }]);
        } else {
          console.log('No countries found');
        }
      })
      .catch((error) => console.error('An error occurred:', error));
  }

  /**
   * Handles the selection of a country and updates the state accordingly.
   *
   * @function onCountrySelect
   *
   * @param {Object} country - The selected country object.
   */
  function onCountrySelect(country) {
    setSelectedCountry(country);
    setSearchValue('');
    setIsExpanded(true);
    setShowFavorites(false);
  }

  /**
   * Toggles the sort order of the country list between ascending and descending.
   *
   * @function onCountrySort
   */
  function onCountrySort() {
    setCountrySortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  }

  /**
   * Handles the click event when the back button is clicked.
   *
   * @function onBackBtnClick
   */
  function onBackBtnClick() {
    setSelectedCountry(null);
    setIsExpanded(false);
    setShowFavorites(false);
    setFavoriteSearchValue('');
    setSearchValue('');
    setCountrySortOrder('asc');
  }

  /**
   * Handles the click event when the "Favorites" button is clicked.
   *
   * @function onFavoritesBtnClick
   */
  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    setCountrySortOrder('asc');
  }

  /**
   * Handles the click event to add a country to favorites.
   *
   * @function onAddFavClick
   *
   * @param {Object} country - The country to be added to favorites.
   */
  function onAddFavClick(country) {
    fetch('http://localhost:5000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: country.name.common,
        population: country.population,
      }),
    })
      .then((response) => response.json())
      .then((newFavCountry) => {
        setFavorites((prevState) => [...prevState, newFavCountry]);
      })
      .catch((error) => {
        console.error('Error adding favorite', error);
      });
  }

  /**
   * Handles the click event to remove a country from favorites.
   *
   * @function onRemoveFavClick
   *
   * @param {string} country - The name of the country to be removed from favorites.
   */
  function onRemoveFavClick(country) {
    const countryToRemove = favorites.find((fav) => fav.country === country);

    if (!countryToRemove || !countryToRemove._id) {
      console.error('Country ID not found', countryToRemove);
      return;
    }

    fetch(`http://localhost:5000/favorites/${countryToRemove._id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setFavorites((prevState) =>
          prevState.filter((fav) => fav._id !== countryToRemove._id)
        );
      })
      .catch((error) => {
        console.error('Error removing favorite', error);
      });
  }

  /**
   * Handles the input change event when searching for favorites.
   *
   * @function onFavoritesSearchInput
   *
   * @param {Object} e - The input change event object.
   */
  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

  /**
   * Handles the click event to remove all favorite countries.
   *
   * @function onRemoveAllFavorites
   */
  function onRemoveAllFavorites() {
    fetch('http://localhost:5000/favorites/all', {
      method: 'DELETE',
    })
      .then(() => {
        setFavorites([]);
      })
      .catch((error) => {
        console.error('Error removing all favorites', error);
      });
  }

  /**
   * Toggles the addition or removal of a country from favorites.
   *
   * @function handleAddRemoveFavToggle
   *
   * @param {Object} country - The country object to toggle.
   */
  function handleAddRemoveFavToggle(country) {
    fetch('http://localhost:5000/favorites')
      .then((response) => response.json())
      .then((favorites) => {
        const isFavorite = favorites.some((fav) => fav.country === country.name.common);
        if (isFavorite) {
          onRemoveFavClick(country.name.common);
        } else {
          onAddFavClick(country);
        }
      })
      .catch((error) => {
        console.error('Error getting favorites', error);
      });
  }

  /**
   * Renders the appropriate content based on the application state.
   *
   * @function renderCountriesPage
   *
   * @returns {JSX.Element} The rendered content based on the application state.
   */
  function renderCountriesPage() {
    if (showFavorites) {
      return (
        <ContFavoritesPage
          countrySortOrder={countrySortOrder}
          onCountrySort={onCountrySort}
          onBackBtnClick={onBackBtnClick}
          favoriteSearchValue={favoriteSearchValue}
          onFavoritesSearchInput={onFavoritesSearchInput}
          handleAddRemoveFavToggle={handleAddRemoveFavToggle}
          onRemoveAllFavorites={onRemoveAllFavorites}
          favorites={favorites}
          onCountrySelect={onCountrySelect}
          fetchHighestPopulation={fetchHighestPopulation}
        />
      );
    }

    if (selectedCountry) {
      return (
        <ContCountryDetailsPage
          onFavoritesBtnClick={onFavoritesBtnClick}
          onBackBtnClick={onBackBtnClick}
          selectedCountry={selectedCountry}
          favorites={favorites}
          handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        />
      );
    }

    return (
      <ContCountryPage
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        countrySortOrder={countrySortOrder}
        onCountrySort={onCountrySort}
        onFavoritesBtnClick={onFavoritesBtnClick}
        countries={countries}
        favorites={favorites}
        handleAddRemoveFavToggle={handleAddRemoveFavToggle}
        onRemoveAllFavorites={onRemoveAllFavorites}
        onCountrySelect={onCountrySelect}
        filterCountries={UtilFilterCountries}
      />
    );
  }

  return <div className={checkIfOnCountryDetails}>{renderCountriesPage()}</div>;
}

export default App;
