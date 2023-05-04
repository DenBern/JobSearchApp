import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <div 
      className="header"
      style={
        {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",

        }
      }
    >
      <div>img</div>
      <div>
        <NavLink style={({isActive}) => ({color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'})} to="/" >Vacancies</NavLink>
      </div>
      <div>
        <NavLink style={({isActive}) => ({color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'})} to="/favorite">Favorite</NavLink>
      </div>
    </div>
  )
}