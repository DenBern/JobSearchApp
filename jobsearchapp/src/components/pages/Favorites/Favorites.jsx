import { useContext, useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";
import { SuperJob } from "../../../service/SuperJob";
import { Context } from "../../../Context";

import { Pagination } from "@mantine/core";

import "./Favorites.css";

export const Favorites = () => {

  const { emptyFavoritesStorage } = useContext(Context);
  const { countPerPage } = SuperJob();
  const [activePage, setActivePage] = useState(1);

  const startCountVacancies = (activePage - 1) * countPerPage;
  const endVCountVacancies = startCountVacancies + countPerPage;

  // const onCurrentPageVacancies = emptyFavoritesStorage ? [] : favoritesStorage.slice(startCountVacancies, endVCountVacancies);

  // useEffect(() => {
  //   console.log(favoritesStorage.length)
  // }, [onCurrentPageVacancies.length])

  return (
    <>
      <div className="wrapper-favorites">
        {/* <div className="favorites">
          {emptyFavorites 
            ? <Empty/> 
            : (!onCurrentPageVacancies.length && null)
            ? !emptyFavorites 
            : onCurrentPageVacancies.map(curVac => {
              return <Vacancy 
                      key={curVac.id}
                      {...curVac}
                      favorite={isFavoriteVacancy(curVac.id)}
                      />
            })
            }
        </div>
        {emptyFavorites ? null :
          <Pagination 
            value={activePage} 
            onChange={activePage => setActivePage(activePage)}
            // total={Math.ceil(favoritesStorage.length / countPerPage)} 
          />
        } */}
      </div>
    </>
  )
}