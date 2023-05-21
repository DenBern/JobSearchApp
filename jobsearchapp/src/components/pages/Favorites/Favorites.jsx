import { useContext, useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { SuperJob } from "../../../service/SuperJob";
import { Context } from "../../../Context";

import { Pagination } from "@mantine/core";

import "./Favorites.css";

export const Favorites = () => {
  
  const { favoritesStorage } = useContext(Context);

  const [activePage, setActivePage] = useState(1);
  const {countPerPage} = SuperJob();
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
  }, [favoritesStorage, startCountVacancies, endVCountVacancies]);

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
        {
          <Pagination 
            value={activePage} 
            onChange={activePage => setActivePage(activePage)}
            total={totalPages} 
          />
        }
      </div>
    </>
  )
}