import { useContext, useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { SuperJob } from "../../../service/SuperJob";
import { Context } from "../../../Context";

import { Pagination } from "@mantine/core";

import "./Favorites.css";

export const Favorites = () => {
  
  const { favoritesStorage } = useContext(Context);

  const {countPerPage} = SuperJob();
  const [activePage, setActivePage] = useState(1);
  const startCountVacancies = (activePage - 1) * countPerPage;
  const endVCountVacancies = startCountVacancies + countPerPage;
  const totalPages = Math.ceil(JSON.parse(localStorage.getItem('favorites')).length / countPerPage);

  const [currentFavoriteVacancies, setCurrentFavoriteVacancies] = useState([...JSON.parse(favoritesStorage)] || []);
  const removeFromFavorites = (id) => {
    const updatedFavorites = currentFavoriteVacancies.filter(favorite => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    setCurrentFavoriteVacancies(updatedFavorites.slice(startCountVacancies, endVCountVacancies))
  }

  const updatedFavorites = () => {
    const favoritesString = localStorage.getItem('favorites')
    const favoritesFromStorage = [...JSON.parse(favoritesString)] || [];
    setCurrentFavoriteVacancies(favoritesFromStorage.slice(startCountVacancies, endVCountVacancies)
    );
  }

  useEffect(() => {
    updatedFavorites()
  }, [favoritesStorage]);

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
        {JSON.parse(favoritesStorage).length > countPerPage 
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