import { useState } from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

export const Search = () => {
    const theme = useMantineTheme();
    const [search, setSearch] = useState('');

    return (
        <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon 
                    size={32} radius="xl" 
                    color={theme.primaryColor} 
                    variant="filled">
                    {theme.dir === 'ltr' ? (
                        <IconArrowRight size="1.1rem" stroke={1.5} />
                    ) : (
                        <IconArrowLeft size="1.1rem" stroke={1.5} />
                    )}
                </ActionIcon>
            }
            placeholder="Введите название вакансии"
            rightSectionWidth={42}
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
    );
}