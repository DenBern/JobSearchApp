import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Text, Paper, Title } from '@mantine/core';

import favorite from '../../assets/png/Save_Button.png';
import './Vacancy.css';

export const Vacancy = (props) => {
    const {
        profession, 
        payment_from, 
        payment_to, 
        type_of_work, 
        town, 
        id} = props;

    const [isFavorite, setIsFavorite] = useState(false);

    const addToFavorite = () => {
        setIsFavorite(true);

        const favoriteVacancy = {
            profession,
            payment_from,
            payment_to,
            type_of_work,
            town,
            id,
        };
        localStorage.setItem(`${id}`, JSON.stringify(favoriteVacancy));
    };

    return (
        <>
            <Paper p="xl">
                <Title order={4}>
                    <Link 
                        to={`/${id}`} 
                        key={id}
                        >{profession}
                    </Link>
                </Title>
                <div className='wrapper'>
                    <Text fw={700} size="md">
                    з/п 
                    {
                        payment_from && payment_to ? 
                        ` ${payment_from} - ${payment_to}`
                        : payment_from && !payment_to ?
                        ` от ${payment_from}` 
                        : payment_to && !payment_from ? 
                        ` до ${payment_to}` 
                        : ' Не указана'
                    }
                    </Text>
                    <div className='divider'>
                        &bull;
                    </div>
                    <Text fz="md">
                        {type_of_work.title}
                    </Text>
                </div>
                <div className='location'>
                    <div className='icon'/>
                    <Text>{town.title}</Text>
                </div>
            </Paper>
        </>
    )
}