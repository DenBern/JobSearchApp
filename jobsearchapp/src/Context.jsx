import React, { useState } from "react";

import { Main } from "./components/pages/Main/Main";
import { Favorites } from "./components/pages/Favorites/Favorites";
import { VacancyDetails } from "./components/pages/VacancyDetails/VacancyDetails";
import { Empty } from "./components/Empty/Empty";

export const Context = React.createContext();

const isFavoriteVacancy = (id) => {
    const favoritesStorageString = localStorage.getItem('favorites');
    const filteredVacancies = favoritesStorageString === null  
        ? [] 
        : JSON.parse(favoritesStorageString).filter(favorite => favorite.id === id);
    return filteredVacancies.length >= 1;
}

const addToFavorite = (favoriteVacancy) => {
    const favoritesStorageString = localStorage.getItem('favorites');
    let favorites = [];

    if (favoritesStorageString !== null) {
        favorites = JSON.parse(favoritesStorageString);
    }

    favorites.push(favoriteVacancy);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const deleteFromFavorite = (id) => {
    const favoritesStorageString = localStorage.getItem('favorites');
    let favorites = JSON.parse(favoritesStorageString);
    favorites = favorites.filter(favorite => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const MainContextProvider = () => {

    const [catalogValue, setCatalogValue] = useState(null);
    const [paymentFrom, setPaymentFrom] = useState(null);
    const [paymentTo, setPaymentTo] = useState(null);
    const [activeFilters, setActiveFilters] = useState(false);

    return (
        <Context.Provider
            value={
                {
                    catalogValue,
                    setCatalogValue,
                    paymentFrom,
                    setPaymentFrom,
                    paymentTo,
                    setPaymentTo,
                    activeFilters,
                    setActiveFilters,
                    isFavoriteVacancy,
                    addToFavorite,
                    deleteFromFavorite,
                }
            }
        >
            {<Main/>}
        </Context.Provider>
    )  
}

export const FavoritesContextProvider = () => {
    const [favoritesStorage, setFavoritesStorage] = useState(localStorage.getItem('favorites'));

    return (
        <Context.Provider
            value={
                {   isFavoriteVacancy,
                    favoritesStorage,
                    deleteFromFavorite,
                    setFavoritesStorage,
                }
            }
        >
            {!JSON.parse(localStorage.getItem('favorites')) ? <Empty/> : <Favorites/>}
        </Context.Provider>
    ) 
}

export const VacancyDetailsContextProvider = () => {
    return (
        <Context.Provider
            value={
                {   
                    isFavoriteVacancy,
                    addToFavorite,
                    deleteFromFavorite,
                }
            }>
        {<VacancyDetails/>}
        </Context.Provider>
    )
}

