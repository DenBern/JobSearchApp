import React, { useEffect, useState } from "react";

import { Main } from "./components/pages/Main/Main";
import {VacancyDetails} from "./components/pages/VacancyDetails/VacancyDetails";
import { Favorites } from "./components/pages/Favorites/Favorites";

export const Context = React.createContext();

const favoritesStorage = JSON.parse(localStorage.getItem('favorites')) ?? false;
const isFavoriteVacancy = (id) => {
    if (favoritesStorage === null) {
        return false
    }
    // } else {
    //     const filteredVacancies = favoritesStorage.filter(favorite => favorite.id === id);
    //     return filteredVacancies.length > 0;
    // }
}

const addToFavorite = (favoriteVacancy) => {
    let favorites = [];
    const favoritesStorage = localStorage.getItem('favorites');

    if (favoritesStorage) {
        favorites = JSON.parse(favoritesStorage);
    }

    favorites.push(favoriteVacancy);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const removeFromFavorite = (id) => {
    const favoritesStorage = localStorage.getItem('favorites');
    let favorites = JSON.parse(favoritesStorage);
    favorites = favorites.filter(favorite => favorite.id !== id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
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
                    favoritesStorage,
                    addToFavorite,
                    removeFromFavorite,
                }
            }
        >
            {<Main/>}
        </Context.Provider>
    )  
}

export const FavoritesContextProvider = () => {

    return (
        <Context.Provider
            value={
                {
                    isFavoriteVacancy,
                    favoritesStorage,
                }
            }
        >
            {<Favorites/>}
        </Context.Provider>
    ) 
}

