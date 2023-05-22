import { Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import "./Error.css";

export const Error = () => {
  return (
    <div className="error">
      <Title order={2}>
        Произошла ошибка при получении данных
      </Title>
      <div className="error-image"/>
      <NavLink 
        className="to-main" 
        to="/">
        Поиск Вакансий
      </NavLink>
    </div>
  )
}