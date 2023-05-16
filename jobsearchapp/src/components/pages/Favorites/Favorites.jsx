import { useEffect, useState } from "react";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Empty } from "../../Empty/Empty";

import './Favorites.css';

export const Favorites = () => {

  const [test, setTest] = useState(JSON.parse(localStorage.getItem('favorites')));

  console.log(test)

  useEffect(() => {
    setTest(JSON.parse(localStorage.getItem('favorites')))
  }, [])

  return (
    <>
      <div className="favorites">
      {test.length ? 
        (test.map(favorite => 
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