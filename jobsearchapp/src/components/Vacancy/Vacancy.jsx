import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Text, Paper, Title } from '@mantine/core';

import favorite from '../../assets/png/Save_Button.png';

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
            <Paper shadow="xs" p="md">
                <Title 
                    order={3} 
                    size={14}>
                    <Link 
                        to={`/${id}`} 
                        key={id}>
                        {profession}
                    </Link>
                </Title>
                <div className='wrapper' style={{display: "flex", flexDirection: "row"}}>
                    <Text fw={700}>
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
                    <div className='divider' style={{display: 'flex', alignItems: 'center', color: '#7B7C88'}}>&bull;</div>
                    <Text fz="md">
                        {type_of_work.title}
                    </Text>
                </div>
                <div className='location'>
                    <div className='icon' style={{backgroundImage: 'url(../../../../assets/png/location_Icon.png)', width: '13.33px', height: '16.09px'}}></div>
                    <Text>{town.title}</Text>
                </div>
            </Paper>
        </>
    )
}