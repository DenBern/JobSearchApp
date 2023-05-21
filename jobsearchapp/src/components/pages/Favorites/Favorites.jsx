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

  const favoriteFromStorage = JSON.parse(favoritesStorage) ?? [];
  
  const [currentFavoriteVacancies, setcurrentFavoriteVacancies] = useState([...favoriteFromStorage]);

  // const onCurrentPageVacancies = () => {
  //   const favoritesStorageString = localStorage.getItem('favorites');
  //   let favorites = JSON.parse(favoritesStorageString).slice(startCountVacancies, endVCountVacancies);
  //   setcurrentFavoriteVacancies(favorites);
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
  // };

  const removeFavorite = (id) => {
    const updatedFavorites = favoriteFromStorage.filter(
      (favorite) => favorite.id !== id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setcurrentFavoriteVacancies(
      updatedFavorites.slice(startCountVacancies, endVCountVacancies)
    );
  };

  useEffect(() => {
    setcurrentFavoriteVacancies(favoriteFromStorage.slice(startCountVacancies, endVCountVacancies))
  }, [activePage])

  return (
    <>
      <div className="wrapper-favorites">
        <div className="favorites">
          {currentFavoriteVacancies.length 
            ? currentFavoriteVacancies.map(currentFavoriteVacancy => {
              return <Vacancy 
                        key={currentFavoriteVacancy.id}
                        {...currentFavoriteVacancy}
                        onRemove={removeFavorite}
                      />
            })
            : <Empty/>
          }
        </div>
        {/* {
          <Pagination 
            value={activePage} 
            onChange={activePage => setActivePage(activePage)}
            total={Math.ceil(JSON.parse(favoritesStorage).length / countPerPage)} 
          />
        } */}
      </div>
    </>
  )
}