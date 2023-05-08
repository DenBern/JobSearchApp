import { Link } from 'react-router-dom';
import { Text, Paper, Title } from '@mantine/core';

import './Vacancy.css';
export const Vacancy = (props) => {

    const {
        profession, 
        payment_from, 
        payment_to, 
        type_of_work, 
        town,
        isFavorite,
        id
    } = props;


    const addToFavorite = () => {
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
        
    const removeFromFavorite = () => {
        localStorage.removeItem(`${id}`);
    };

    return (
        <>
            <Paper p="xl">
                <div className='wrapper-vacancy'>
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
                </div>
                <button 
                    type="button"
                    onClick={isFavorite ? removeFromFavorite : addToFavorite}
                    className={ isFavorite ? 'favoriteActive' : 'favoriteDefault'}
                />
            </Paper>
        </>
    )
}