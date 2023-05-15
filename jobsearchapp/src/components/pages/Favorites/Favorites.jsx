import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";

import './Favorites.css';

export const Favorites = () => {

  const favorites = JSON.parse(localStorage.getItem('favorites'));

  return (
    <>
      <div className="favorites">
      {favorites.length ? 
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