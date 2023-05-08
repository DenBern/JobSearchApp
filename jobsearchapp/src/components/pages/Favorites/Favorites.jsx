import { useEffect } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";

import './Favorites.css';

export const Favorites = () => {

  const favorites = [];

  for(let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index);
    const favorite = localStorage.getItem(`${key}`)
    const result = JSON.parse(favorite)
    favorites.push(result)
  }

  useEffect(() => {

  }, [favorites])

  return (
    <>
      <div className="vacancies">
        {favorites.map(favorite => 
            <Vacancy 
              key={favorite.id} 
              {...favorite} 
              isFavorite={true}
            />
          )}
      </div>
    </>
  )
}