import { useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";

import './Favorites.css';
import { Empty } from "../../Empty/Empty";

export const Favorites = () => {

  const [favorites, setFavorites] = useState([]);

  const favoritesChange = () => {
    const favorites = [];
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index);
      const favorite = localStorage.getItem(`${key}`);
      const result = JSON.parse(favorite);
      favorites.push(result);
    }
    setFavorites(favorites);
  };

  useEffect(() => {
    favoritesChange()
  }, [])

  return (
    <>
      <div className="favorites">
      {favorites.length !== 0 ? 
        (favorites.map(favorite => 
            <Vacancy
              key={favorite.id} 
              {...favorite} 
              favorite={true}
            />
          )
        )
          : <Empty/>
      }
      </div>
    </>
  )
}