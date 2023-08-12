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

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySortOrder, setCountrySortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [countries, setCountries] = useState([]);
  const [favoriteSearchValue, setFavoriteSearchValue] = useState('');

  const checkIfOnCountryDetails = isExpanded ? 'app-expanded' : 'app';

  // fetches and sorts countries
  useEffect(() => {
    async function getCountries() {
      const fetchedCountries = await UtilFetchCountries();
      const sortedCountries = UtilSortData(fetchedCountries, countrySortOrder);
      setCountries(sortedCountries);
    }

    getCountries();

    fetch('http://localhost:5000/favorites')
      .then((response) => response.json())
      .then((fetchedFavorites) => {
        const sortedFavorites = UtilSortFavorites(
          fetchedFavorites,
          countrySortOrder
        );
        setFavorites(sortedFavorites);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, [countrySortOrder]);

  function fetchHighestPopulation() {
    fetch('http://localhost:5000/favorites/highestPopulation')
      .then((response) => response.json())
      .then((highestPopulationCountry) => {
        if (highestPopulationCountry.length > 0) {
          setFavorites([
            { ...highestPopulationCountry[0], isHighestPopulation: true },
          ]);
        } else {
          console.log('No countries found');
        }
      })
      .catch((error) => console.error('An error occurred:', error));
  }

  // handling events
  // TODO: add fetching of data here for chosen country
  function onCountrySelect(country) {
    setSelectedCountry(country);
    setSearchValue('');
    setIsExpanded(true);
    setShowFavorites(false);
  }

  function onCountrySort() {
    setCountrySortOrder((prevSortOrder) =>
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
  }

  function onBackBtnClick() {
    setSelectedCountry(null);
    setIsExpanded(false);
    setShowFavorites(false);
    setFavoriteSearchValue('');
    setSearchValue('');
    setCountrySortOrder('asc');
    // setCountrySortOrder((prevSortOrder) => prevSortOrder);
  }

  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    setCountrySortOrder('asc');
    // setCountrySortOrder((prevSortOrder) => prevSortOrder);
  }

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

  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

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

  // toggle
  function handleAddRemoveFavToggle(country) {
    fetch('http://localhost:5000/favorites')
      .then((response) => response.json())
      .then((favorites) => {
        const isFavorite = favorites.some(
          (fav) => fav.country === country.name.common
        );
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

  // rendering
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
