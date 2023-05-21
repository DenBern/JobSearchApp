import { Title } from "@mantine/core";
import "./Error.css";

export const Error = () => {
  return (
    <div className="error">
      <Title order={2}>
        Произошла ошибка при получении данных
      </Title>
      <div className="error-image"/>
    </div>
  )
}