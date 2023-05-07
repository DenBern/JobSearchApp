import { NavLink } from "react-router-dom"

import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="title-logo">
        <div className="logo">
          <div className="one"></div>
          <div className="two"></div>
        </div>
        <h1>Jobored</h1>
      </div>
      <div>
        <NavLink style={({isActive}) => ({color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'})} to="/" >Vacancies</NavLink>
      </div>
      <div>
        <NavLink style={({isActive}) => ({color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'})} to="/favorite">Favorite</NavLink>
      </div>
    </div>
  )
}