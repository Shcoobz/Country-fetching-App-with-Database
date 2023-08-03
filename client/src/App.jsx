import { useState, useEffect } from 'react';
import './App.css';

import ContCountryPage from './content/ContCountryPage';
import ContCountryDetailsPage from './content/ContCountryDetailsPage';
import ContFavoritesPage from './content/ContFavoritesPage';

import UtilFilterCountries from './utils/UtilFilterCountries';
import UtilFetchCountries from './utils/UtilFetchCountries';
import UtilSortData from './utils/UtilSortData';

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
        console.log(fetchedFavorites);
        setFavorites(fetchedFavorites);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, [countrySortOrder]);

  // sorts favorites
  // useEffect(() => {
  //   setFavorites((prevFavorites) =>
  //     UtilSortData(prevFavorites, countrySortOrder)
  //   );
  // }, [countrySortOrder]);

  // fetches favorites
  // useEffect(() => {
  //   fetch('http://localhost:5000/favorites')
  //     .then((response) => response.json())
  //     .then((fetchedFavorites) => {
  //       console.log(fetchedFavorites);
  //       setFavorites(fetchedFavorites);
  //     })
  //     .catch((error) => console.error('An error occurred:', error));
  // }, []);

  // handling events
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
    // setCountrySortOrder('asc');
    setCountrySortOrder((prevSortOrder) => prevSortOrder);
  }

  function onFavoritesBtnClick() {
    setShowFavorites(true);
    setIsExpanded(false);
    // setCountrySortOrder('asc');
    setCountrySortOrder((prevSortOrder) => prevSortOrder);
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
        setFavorites((prevFavorites) => [...prevFavorites, newFavCountry]);
      })
      .catch((error) => console.error('An error occurred:', error));
  }

  function onRemoveFavClick(country) {
    // setFavorites((prevFavorites) => {
    //   const updatedFavorites = prevFavorites.filter(
    //     (fav) => fav.name.common !== country.name.common
    //   );

    //   return UtilSortData(updatedFavorites);
    // });

    fetch('http://localhost:5000/favorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: country.name.common,
      }),
    })
      .then(() => {
        setFavorites((prevFavorites) => {
          const updatedFavorites = prevFavorites.filter(
            (fav) => fav.country !== country.name.common
          );
          return updatedFavorites;
        });
      })
      .catch((error) => console.error('An error occurred:', error));
  }

  function onFavoritesSearchInput(e) {
    setFavoriteSearchValue(e.target.value);
  }

  function onRemoveAllFavorites() {
    setFavorites([]);
  }

  // toggle
  function handleAddRemoveFavToggle(country) {
    if (
      favorites.some((fav) => {
        return fav && fav.name && fav.name.common === country.name.common;
      })
    ) {
      onRemoveFavClick(country);
    } else {
      onAddFavClick(country);
    }
  }

  // rendering
  // function renderCountriesPage() {
  //   if (showFavorites) {
  //     return (
  //       <ContFavoritesPage
  //         countrySortOrder={countrySortOrder}
  //         onCountrySort={onCountrySort}
  //         onBackBtnClick={onBackBtnClick}
  //         favoriteSearchValue={favoriteSearchValue}
  //         onFavoritesSearchInput={onFavoritesSearchInput}
  //         handleAddRemoveFavToggle={handleAddRemoveFavToggle}
  //         onRemoveAllFavorites={onRemoveAllFavorites}
  //         favorites={favorites}
  //         onCountrySelect={onCountrySelect}
  //       />
  //     );
  //   }

  //   if (selectedCountry) {
  //     return (
  //       <ContCountryDetailsPage
  //         onFavoritesBtnClick={onFavoritesBtnClick}
  //         onBackBtnClick={onBackBtnClick}
  //         selectedCountry={selectedCountry}
  //         favorites={favorites}
  //         handleAddRemoveFavToggle={handleAddRemoveFavToggle}
  //       />
  //     );
  //   }

  //   return (
  //     <ContCountryPage
  //       searchValue={searchValue}
  //       setSearchValue={setSearchValue}
  //       countrySortOrder={countrySortOrder}
  //       onCountrySort={onCountrySort}
  //       onFavoritesBtnClick={onFavoritesBtnClick}
  //       countries={countries}
  //       favorites={favorites}
  //       handleAddRemoveFavToggle={handleAddRemoveFavToggle}
  //       onRemoveAllFavorites={onRemoveAllFavorites}
  //       onCountrySelect={onCountrySelect}
  //       filterCountries={UtilFilterCountries}
  //     />
  //   );
  // }

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

    // Only render ContCountryPage when none of the other conditions are met
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
