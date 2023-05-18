import { useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { Pagination } from "@mantine/core";
import { SuperJob } from "../../../service/SuperJob";

import './Favorites.css';

export const Favorites = () => {
  
  const {countPerPage} = SuperJob();
  const [activePage, setActivePage] = useState(1);
  
  const storageFavorites = JSON.parse(localStorage.getItem('favorites'));
  const coutStorageVacancies = storageFavorites.length;
  const startCountVacancies = (activePage - 1) * countPerPage;
  const endVCountVacancies = startCountVacancies + countPerPage;
  const onCurrentPageVacancies = storageFavorites.slice(startCountVacancies, endVCountVacancies);


  
  const showVacancies = () => {
    return onCurrentPageVacancies.map((favorite) => (
      <Vacancy
        key={favorite.id}
        {...favorite}
        favorite={true}
      />
    ));
  };

  return (
    <div className="wrapper-favorites">
      <div className="favorites">
        {!coutStorageVacancies && <Empty/>}
        {showVacancies()}
      </div>
      <Pagination 
        value={activePage} 
        onChange={(activePage) => setActivePage(activePage)}
        total={Math.ceil(storageFavorites.length / countPerPage)} 
      />
    </div>
  )
}