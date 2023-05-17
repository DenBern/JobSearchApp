import { useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { Pagination } from "@mantine/core";
import { SuperJob } from "../../../service/SuperJob";

import './Favorites.css';

export const Favorites = () => {

  const storageFavorites = JSON.parse(localStorage.getItem('favorites'));
  const {countPerPage} = SuperJob();

  const [activePage, setActivePage] = useState(1);

  const renderVacancies = () => {
    const startCountVacancies = (activePage - 1) * countPerPage;
    const endVCountVacancies = startCountVacancies + countPerPage;
    const onCurrentPageVacancies = storageFavorites.slice(startCountVacancies, endVCountVacancies);

    return onCurrentPageVacancies.map((favorite) => (
      <Vacancy 
        key={favorite.id} 
        {...favorite} 
        favorite={true}
      />
    ));
  };

  return (
    <>
      <div className="favorites">
        {/* {storageFavorites.length >= countPerPage ? 
          // eslint-disable-next-line array-callback-return
          (storageFavorites.map((favorite, index) => {
              if (index < countPerPage) {
                return (
                  <Vacancy
                    key={favorite.id} 
                    {...favorite} 
                    favorite={true}
                  />
                )
              }
            })
          )
            : <Empty/>
        } */}
        {storageFavorites.length >= countPerPage ? renderVacancies() : <Empty />}
      <Pagination 
        value={activePage} 
        onChange={(activePage) => setActivePage(activePage)}
        total={Math.ceil(storageFavorites.length / countPerPage)} 
      />
      </div>
    </>
  )
}