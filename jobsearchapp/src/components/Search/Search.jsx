import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import './Search.css';

export const Search = (props) => {
    const {updateVacancy, updatePage} = props;
    const [search, setSearch] = useState('');

    const handlesearch = () => {
        updatePage(0)
        updateVacancy(search)
    }

    return (
        <TextInput 
            radius="md"
            type="text"
            placeholder="Введите название вакансии"
            value={search}
            onChange={e => setSearch(e.target.value)}
            withAsterisk
            rightSection=
                {
                    <Button
                        size="xs"
                        onClick={handlesearch}>
                        Поиск
                    </Button>
                }
            icon={<IconSearch size="1rem" />}
        />
    );
}