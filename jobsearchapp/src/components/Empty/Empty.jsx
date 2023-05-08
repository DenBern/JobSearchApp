import { Button, Text } from "@mantine/core";

import './Empty.css';
import { NavLink } from "react-router-dom";

export const Empty = () => {
  return (
    <div className="empty">
      <div className="empty-image"/>
      <Text 
        fz="xl" 
        fw={700}
        >Упс, здесь еще ничего нет!
      </Text>
      <NavLink 
        className="to-main" 
        to="/">
        Поиск Вакансий
      </NavLink>
    </div>
  )
}