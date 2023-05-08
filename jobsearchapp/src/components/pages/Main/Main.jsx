import {useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";


import { Pagination } from '@mantine/core';
import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';
import  './Main.css';

export const Main = () => {
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(0);
    
    const [catalogValue, setCatalogValue] = useState(33);
    const [paymentFrom, setPaymentFrom] = useState(0);
    const [paymentTo, setPaymentTo] = useState();

    const {
        getAccessToken, 
        getVacancies, 
        vacancies, 
        countVacancies, 
        getCatalogues, 
        catalogues
    } = SuperJob();

    const vacanciesOnThePage = 4;
    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / vacanciesOnThePage) 
        : Math.ceil(maxAPILimit / vacanciesOnThePage);

    useEffect(() => {
        getAccessToken();
        getCatalogues();
        getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page);
    }, []);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page);
    }, [vacancy, page]);

    const submitFilters = (e) => {
        e.preventDefault();
        page === 0 ? getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page) : setPage(0);
    }

    return (
        <>
            <div className="filters">
                <form>
                    <Select
                        data={catalogues.map(catalog => catalog.title_rus)}
                        placeholder="Выберете отрасль"
                        label="Отрасль"
                        radius="md"
                        size="md"
                        limit={2}
                    />
                    {/* <select onChange={event => setCatalogValue(event.target.value)}>
                        {catalogues.map(catalog => 
                            <option 
                                key={catalog.key}
                                value={catalog.key}>
                                {catalog.title_rus}
                            </option>
                        )}
                    </select> */}
                    <label>Оклад
                        <NumberInput
                            type="number"
                            placeholder="От"
                            min={0}
                            max={paymentTo}
                            onChange={value => setPaymentFrom(value)}
                        />
                        <NumberInput
                            type="number"
                            placeholder="До"
                            min={paymentFrom}
                            onChange={value => setPaymentTo(value)}
                        />
                    </label>
                    <Button
                        // style={{backgroundColor: searchOn ? '#228be6' : '#228be64d'}}
                        onClick={submitFilters}>
                        Применить
                    </Button>
                </form>
            </div>
            <div className="search-content">
                <Search 
                    updateVacancy={(search) => setVacancy(search)} 
                    updatePage={setPage}
                />
                <div className="vacancies">
                    {vacancies.map(vacancy => 
                        <Vacancy 
                            key={vacancy.id}  
                            {...vacancy}
                            favorite={localStorage.getItem(`${vacancy.id}`) ? true : false}
                        />
                    )}
                </div>
                {vacancies.length >= 4 && 
                    (
                        <Pagination 
                            value={page} 
                            onChange={setPage} 
                            total={pages}
                        />
                    )
                }
            </div>
        </>
    )
}