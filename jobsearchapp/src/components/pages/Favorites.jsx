import { Vacancy } from "../Vacancy/Vacancy";

export const Favorites = () => {

  const favorites = [];

  for(let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index);
    const favorite = localStorage.getItem(`${key}`)
    const result = JSON.parse(favorite)
    favorites.push(result)
  }

  return (
    <>
      {favorites.map(favorite => <Vacancy key={favorite.id} {...favorite}>{favorite.profession}</Vacancy>)}
    </>
  )
}