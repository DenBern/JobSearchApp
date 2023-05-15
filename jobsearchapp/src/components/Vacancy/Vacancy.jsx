import { Link } from 'react-router-dom';
import { Text, Paper, Title } from '@mantine/core';
import { useState } from 'react';
import './Vacancy.css';

export const Vacancy = (props) => {
    const {
        profession, 
        payment_from, 
        payment_to, 
        type_of_work, 
        town,
        favorite,
        id,
        town_id,
        type_of_work_id,
    } = props;

    const [isFavorite, setIsFavorite] = useState(favorite);

    const addToFavorite = () => {
        const favoriteVacancy = {
            profession,
            payment_from,
            payment_to,
            type_of_work,
            town,
            id,
            favorite,
        };

        let favorites = [];
        const favoritesStorage = localStorage.getItem('favorites');

        if (favoritesStorage) {
            favorites = JSON.parse(favoritesStorage);
        }

        favorites.push(favoriteVacancy);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
    };

    const removeFromFavorite = () => {
        const favoritesStorage = localStorage.getItem('favorites');
        let favorites = JSON.parse(favoritesStorage);
        favorites = favorites.filter(favorite => favorite.id !== id)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setIsFavorite(false);
    }; 
        
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
                    onClick={isFavorite ? removeFromFavorite : addToFavorite}
                    className={ isFavorite ? "favoriteActive" : "favoriteDefault"}
                />
            </Paper>
        </>
    )
}