import { useContext, useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { SuperJob } from "../../../service/SuperJob";
import { Context } from "../../../Context";

import { Pagination } from "@mantine/core";

import "./Favorites.css";

export const Favorites = () => {
  
  const { favoritesStorage, setFavoritesStorage } = useContext(Context);

  const {countPerPage} = SuperJob();
  const [activePage, setActivePage] = useState(1);
  const startCountVacancies = (activePage - 1) * countPerPage;
  const endVCountVacancies = startCountVacancies + countPerPage;
  const totalPages = Math.ceil(JSON.parse(favoritesStorage).length / countPerPage);

  const [currentFavoriteVacancies, setCurrentFavoriteVacancies] = useState(JSON.parse(favoritesStorage) || []);

  const removeFromFavorites = (id) => {
    const currentFavoriteVacancies = JSON.parse(favoritesStorage);
    const deletedItem = currentFavoriteVacancies.findIndex((favorite) => favorite.id === id);
    currentFavoriteVacancies.splice(deletedItem, 1);
    setFavoritesStorage(JSON.stringify(currentFavoriteVacancies))
    setCurrentFavoriteVacancies(currentFavoriteVacancies);
  }

  const updatedFavorites = () => {
    const favoritesFromStorage = JSON.parse(favoritesStorage) || [];
    const favoritesFromStoragePerPage = favoritesFromStorage.slice(startCountVacancies, endVCountVacancies);
    if (!favoritesFromStoragePerPage.length) {
      setActivePage(activePage - 1)
    }
    setCurrentFavoriteVacancies(favoritesFromStoragePerPage)
  }

  useEffect(() => {
    if (JSON.parse(favoritesStorage).length) {
      updatedFavorites();
    }
  }, [favoritesStorage, activePage]);

  return (
    <>
      <div className="wrapper-favorites">
        <div className="favorites">
          {currentFavoriteVacancies.length 
            ? currentFavoriteVacancies.map(currentFavoriteVacancy => {
              return <Vacancy 
                        key={currentFavoriteVacancy.id}
                        {...currentFavoriteVacancy}
                        onRemove={removeFromFavorites}
                      />
            })
            : <Empty/>
          }
        </div>
        {JSON.parse(localStorage.getItem('favorites'))?.length > countPerPage 
          ? (
              <Pagination 
                value={activePage} 
                onChange={activePage => setActivePage(activePage)}
                total={totalPages} 
              />
            )
          : null
        }
      </div>
    </>
  )
}