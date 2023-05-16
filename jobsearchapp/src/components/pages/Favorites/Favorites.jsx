import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";

import './Favorites.css';

export const Favorites = () => {

  const storageFavorites = JSON.parse(localStorage.getItem('favorites'));

  return (
    <>
      <div className="favorites">
        {storageFavorites.length ? 
          (storageFavorites.map(favorite => 
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