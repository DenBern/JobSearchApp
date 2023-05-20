import { Link } from "react-router-dom";
import { Text, Paper, Title } from "@mantine/core";
import { useContext, useState } from "react";

import { Context } from "../../Context";

import "./Vacancy.css";

export const Vacancy = (props) => {
    const {
        profession, 
        payment_from, 
        payment_to, 
        type_of_work, 
        town,
        id,
        town_id,
        type_of_work_id,
    } = props;

    const favoriteVacancy = {
        profession,
        payment_from,
        payment_to,
        type_of_work,
        town,
        id,
        town_id,
        type_of_work_id,
    };

    const {addToFavorite, removeFromFavorite, isFavoriteVacancy} = useContext(Context);
    const [favorite, setFavorite] = useState(isFavoriteVacancy(props.id));

    const handleToggleFavorite = () => {
        if(isFavoriteVacancy(id)) {
            removeFromFavorite(id);
        } else {
            addToFavorite(favoriteVacancy);
        }
        setFavorite(!favorite);
    }

    return (
        <>
            <Paper p="xl">
                <div className="wrapper-vacancy">
                    <Title order={4}>
                        <Link
                            to={`/${id}`} 
                            key={id}
                            >{profession}
                        </Link>
                    </Title>
                    <div className="wrapper">
                        <Text fw={700} size="md">
                            з/п 
                            {
                                payment_from && payment_to ? 
                                ` ${payment_from} - ${payment_to}`
                                : payment_from && !payment_to ?
                                ` от ${payment_from}` 
                                : payment_to && !payment_from ? 
                                ` до ${payment_to}` 
                                : " Не указана"
                            }
                        </Text>
                        <div className="divider">
                            &bull;
                        </div>
                        <Text fz="md">
                            {type_of_work && type_of_work.title}
                            {type_of_work_id && type_of_work_id}
                        </Text>
                    </div>
                    <div className="location">
                        <div className="icon"/>
                        <Text>
                            {town && town.title}
                            {town_id && town_id}
                        </Text>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={handleToggleFavorite}
                    className={favorite ? "favoriteActive" : "favoriteDisabled"}
                />
            </Paper>
        </>
    )
}