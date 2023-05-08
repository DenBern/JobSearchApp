import { NavLink } from "react-router-dom"

import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="title-logo">
        <div className="logo" />
        <h1>Jobored</h1>
      </div>
      <div>
        <NavLink 
          style=
            {
              ({isActive}) => (
                {
                  color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'
                }
              )
            } 
          to="/">Поиск Вакансий
        </NavLink>
      </div>
      <div>
        <NavLink 
          style=
            {
              ({isActive}) => (
                {
                  color: isActive ? '#5E96FC' : '#000', textDecoration: 'none'
                }
              )
            } 
          to="/favorite"
          >Избранное
        </NavLink>
      </div>
    </div>
  )
}