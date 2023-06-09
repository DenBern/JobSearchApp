import { NavLink } from "react-router-dom"

import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="title-logo">
          <div className="logo" />
          <h1>Jobored</h1>
        </div>
        <div className="links">
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
              to={`/?page=${1}`}>
              Поиск Вакансий
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
              to={`/favorites`}>
              Избранное
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}