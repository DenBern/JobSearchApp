import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';

import './Search.css';
import { SuperJob } from '../../service/SuperJob';

export const Search = (props) => {

    const {updateVacancy} = props;
    const [search, setSearch] = useState('');

    const handlesearch = () => {
        updateVacancy(search);
    };

    return (
        <TextInput
            data-elem="search-input"
            radius="md"
            type="text"
            placeholder="Введите название вакансии"
            value={search}
            onChange={e => setSearch(e.target.value)}
            withAsterisk
            rightSection=
                {
                    <Button
                        data-elem="search-button"
                        size="xs"
                        onClick={() => {
                            handlesearch();
                            }
                        }>
                        Поиск
                    </Button>
                }
            icon={<div className='search-icon'></div>}
        />
    );
}