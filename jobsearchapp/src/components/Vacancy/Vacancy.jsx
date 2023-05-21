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
        onRemove,
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

    const {addToFavorite, deleteFromFavorite, isFavoriteVacancy} = useContext(Context);
    const [favorite, setFavorite] = useState(isFavoriteVacancy(id));

    const handleToggleFavorite = () => {
        if(isFavoriteVacancy(id)) {
            deleteFromFavorite(id);
            if (window.location.href.includes('favorites')) {
                onRemove(id)
            }
        } else {
            addToFavorite(favoriteVacancy);
        }
        setFavorite(!favorite);
    }

    const urlDetails = window.location.href.includes(`${id}`);

    return (
        <>
            <Paper p="xl">
                <div className="wrapper-vacancy">
                    {urlDetails 
                    ?   (
                            <Title order={3}>
                                {profession}
                            </Title> 
                        )
                    :   (
                            <Title order={4}>
                                <Link
                                    data-elem={`vacancy-${id}`}
                                    to={`/${id}`} 
                                    key={id}>
                                        {profession}
                                </Link>
                            </Title>
                        )
                    }
                    <div className="wrapper">
                        <Text fw={700} size={urlDetails ? "lg" : "md"}>
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
                        <Text size={urlDetails ? "lg" : "md"}>
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