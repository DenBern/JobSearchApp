import { Text } from "@mantine/core";

import './Empty.css';
import { NavLink } from "react-router-dom";

export const Empty = () => {
  return (
    <div className="empty">
      <div className="empty-image"/>
      <Text 
        fz="1.5rem" 
        fw={700}>
        Упс, здесь еще ничего нет!
      </Text>
      {window.location.href.includes('favorites') 
        ? (
            <NavLink 
              className="to-main" 
              to="/">
              Поиск Вакансий
            </NavLink>
          )
        : null
      }
    </div>
  )
}